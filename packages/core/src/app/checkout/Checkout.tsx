import {
  Address,
  BillingAddress,
  Cart,
  CartChangedError,
  CheckoutParams,
  CheckoutSelectors,
  Consignment,
  EmbeddedCheckoutMessenger,
  EmbeddedCheckoutMessengerOptions,
  FlashMessage,
  Customer as ICustomer,
  Checkout as ICheckout,
  Order,
  PaymentMethod,
  Promotion,
  RequestOptions,
} from '@bigcommerce/checkout-sdk';
import classNames from 'classnames';
import { find, findIndex } from 'lodash';
import React, { Component, lazy, ReactNode } from 'react';

import { AnalyticsContextProps } from '@bigcommerce/checkout/analytics';
import { ExtensionContextProps, withExtension } from '@bigcommerce/checkout/checkout-extension';
import { ErrorLogger } from '@bigcommerce/checkout/error-handling-utils';
import { TranslatedString, withLanguage, WithLanguageProps } from '@bigcommerce/checkout/locale';
import { ChecklistSkeleton } from '@bigcommerce/checkout/ui';

import { withAnalytics } from '../analytics';
import { EmptyCartMessage } from '../cart';
import { withCheckout } from '../checkout';
import { CustomError, ErrorModal, isCustomError } from '../common/error';
import { retry } from '../common/utility';
import { CheckoutButtonContainer, CustomerViewType } from '../customer';
import { getSupportedMethodIds } from '../customer/getSupportedMethods';
import { SubscribeSessionStorage } from '../customer/SubscribeSessionStorage';
import { EmbeddedCheckoutStylesheet, isEmbedded } from '../embeddedCheckout';
import { PromotionBannerList } from '../promotion';
import { hasSelectedShippingOptions, isUsingMultiShipping } from '../shipping';
import { ShippingOptionExpiredError } from '../shipping/shippingOption';
import { LazyContainer, LoadingNotification, LoadingOverlay } from '../ui/loading';

import { BillingStep } from './BillingStep/BillingStep';
import CheckoutStep from './CheckoutStep';
import CheckoutStepStatus from './CheckoutStepStatus';
import CheckoutStepType from './CheckoutStepType';
import CheckoutSupport from './CheckoutSupport';
import { CustomerStep } from './CustomerStep/CustomerStep';
import mapToCheckoutProps from './mapToCheckoutProps';
import navigateToOrderConfirmation from './navigateToOrderConfirmation';
import { ShippingStep } from './ShippingStep/ShippingStep';
import { ibcUrl } from './utils/checkout-utils';

const CartSummary = lazy(() =>
  retry(
    () =>
      import(
        /* webpackChunkName: "cart-summary" */
        '../cart/CartSummary'
      ),
  ),
);

const Payment = lazy(() =>
  retry(
    () =>
      import(
        /* webpackChunkName: "payment" */
        '../payment/Payment'
      ),
  ),
);

export interface CheckoutProps {
  checkoutId: string;
  containerId: string;
  embeddedStylesheet: EmbeddedCheckoutStylesheet;
  embeddedSupport: CheckoutSupport;
  errorLogger: ErrorLogger;
  createEmbeddedMessenger(options: EmbeddedCheckoutMessengerOptions): EmbeddedCheckoutMessenger;
}

export interface CheckoutState {
  activeStepType?: CheckoutStepType;
  isBillingSameAsShipping: boolean;
  customerViewType?: CustomerViewType;
  defaultStepType?: CheckoutStepType;
  error?: Error;
  flashMessages?: FlashMessage[];
  isMultiShippingMode: boolean;
  isCartEmpty: boolean;
  isRedirecting: boolean;
  hasSelectedShippingOptions: boolean;
  isHidingStepNumbers: boolean;
  isSubscribed: boolean;
  buttonConfigs: PaymentMethod[];

  shippingAddress?: Address;
  billingAddress?: BillingAddress;
  customer: ICustomer;
  order: Order;
  checkout: ICheckout;
}

export interface WithCheckoutProps {
  billingAddress?: Address;
  cart?: Cart;
  consignments?: Consignment[];
  error?: Error;
  hasCartChanged: boolean;
  flashMessages?: FlashMessage[];
  isGuestEnabled: boolean;
  isLoadingCheckout: boolean;
  isPending: boolean;
  isPriceHiddenFromGuests: boolean;
  isShowingWalletButtonsOnTop: boolean;
  loginUrl: string;
  cartUrl: string;
  createAccountUrl: string;
  promotions?: Promotion[];
  steps: CheckoutStepStatus[];
  clearError(error?: Error): void;
  loadCheckout(id: string, options?: RequestOptions<CheckoutParams>): Promise<CheckoutSelectors>;
  loadPaymentMethodByIds(methodIds: string[]): Promise<CheckoutSelectors>;
  subscribeToConsignments(subscriber: (state: CheckoutSelectors) => void): () => void;
}

class Checkout extends Component<
  CheckoutProps &
    WithCheckoutProps &
    WithLanguageProps &
    AnalyticsContextProps &
    ExtensionContextProps,
  CheckoutState
> {
  state: CheckoutState = {
    isBillingSameAsShipping: true,
    isCartEmpty: false,
    isRedirecting: false,
    isMultiShippingMode: false,
    hasSelectedShippingOptions: false,
    isHidingStepNumbers: true,
    isSubscribed: false,
    buttonConfigs: [],
    customer: {} as ICustomer,
    order: {} as Order,
    checkout: {} as any,
  };

  private embeddedMessenger?: EmbeddedCheckoutMessenger;
  private unsubscribeFromConsignments?: () => void;

  componentWillUnmount(): void {
    if (this.unsubscribeFromConsignments) {
      this.unsubscribeFromConsignments();
      this.unsubscribeFromConsignments = undefined;
    }

    window.removeEventListener('beforeunload', this.handleBeforeExit);
    this.handleBeforeExit();
  }

  async componentDidMount(): Promise<void> {
    const {
      analyticsTracker,
      checkoutId,
      containerId,
      createEmbeddedMessenger,
      embeddedStylesheet,
      extensionService,
      loadCheckout,
      loadPaymentMethodByIds,
      subscribeToConsignments,
    } = this.props;

    try {
      const [{ data }] = await Promise.all([
        loadCheckout(checkoutId, {
          params: {
            include: [
              'cart.lineItems.physicalItems.categoryNames',
              'cart.lineItems.digitalItems.categoryNames',
            ] as any, // FIXME: Currently the enum is not exported so it can't be used here.
          },
        }),
        extensionService.loadExtensions(),
      ]);

      const providers = data.getConfig()?.checkoutSettings?.remoteCheckoutProviders || [];
      const supportedProviders = getSupportedMethodIds(providers);

      if (providers.length > 0) {
        const configs = await loadPaymentMethodByIds(supportedProviders);

        this.setState({
          buttonConfigs: configs.data.getPaymentMethods() || [],
        });
      }

      extensionService.preloadExtensions();

      const { links: { siteLink = '' } = {} } = data.getConfig() || {};
      const errorFlashMessages = data.getFlashMessages('error') || [];

      if (errorFlashMessages.length) {
        const { language } = this.props;

        this.setState({
          error: new CustomError({
            title: errorFlashMessages[0].title || language.translate('common.error_heading'),
            message: errorFlashMessages[0].message,
            data: {},
            name: 'default',
          }),
        });
      }

      const messenger = createEmbeddedMessenger({ parentOrigin: siteLink });

      this.unsubscribeFromConsignments = subscribeToConsignments(this.handleConsignmentsUpdated);
      this.embeddedMessenger = messenger;
      messenger.receiveStyles((styles) => embeddedStylesheet.append(styles));
      messenger.postFrameLoaded({ contentId: containerId });
      messenger.postLoaded();

      analyticsTracker.checkoutBegin();

      const consignments = data.getConsignments();
      const cart = data.getCart();

      const hasMultiShippingEnabled = data.getConfig()?.checkoutSettings.hasMultiShippingEnabled;
      const checkoutBillingSameAsShippingEnabled =
        data.getConfig()?.checkoutSettings.checkoutBillingSameAsShippingEnabled ?? true;
      const removeStepNumbersFlag =
        data.getConfig()?.checkoutSettings.features['CHECKOUT-7255.remove_checkout_step_numbers'] ??
        false;
      const defaultNewsletterSignupOption =
        data.getConfig()?.shopperConfig.defaultNewsletterSignup ?? false;
      const isMultiShippingMode =
        !!cart &&
        !!consignments &&
        hasMultiShippingEnabled &&
        isUsingMultiShipping(consignments, cart.lineItems);

      this.setState({
        isBillingSameAsShipping: checkoutBillingSameAsShippingEnabled,
        isHidingStepNumbers: removeStepNumbersFlag,
        isSubscribed: defaultNewsletterSignupOption,

        shippingAddress: data.getShippingAddress(),
        billingAddress: data.getBillingAddress(),
        customer: data.getCustomer()!,
        order: data.getOrder()!,
        checkout: data.getCheckout()!,
      });

      if (isMultiShippingMode) {
        this.setState({ isMultiShippingMode }, this.handleReady);
      } else {
        this.handleReady();
      }

      window.addEventListener('beforeunload', this.handleBeforeExit);
    } catch (error) {
      if (error instanceof Error) {
        this.handleUnhandledError(error);
      }
    }
  }

  render(): ReactNode {
    const { error, isHidingStepNumbers } = this.state;
    let errorModal = null;

    if (error) {
      if (isCustomError(error)) {
        errorModal = (
          <ErrorModal error={error} onClose={this.handleCloseErrorModal} title={error.title} />
        );
      } else {
        errorModal = <ErrorModal error={error} onClose={this.handleCloseErrorModal} />;
      }
    }

    return (
      <div
        className={classNames('font-brother-1816', {
          'is-embedded': isEmbedded(),
          'remove-checkout-step-numbers': isHidingStepNumbers,
        })}
        data-test="checkout-page-container"
        id="checkout-page-container"
      >
        <div className="bg-ibc-orange ibc-container" style={{ height: '70px' }}>
          <div className="ibc-container-fixed flex h-full items-center justify-between">
            <a href={`${ibcUrl}/cart`} style={{ filter: 'brightness(0) invert(1)' }}>
              <img
                src="https://res.cloudinary.com/dsewycgig/image/upload/v1705889390/ibf_assets/ibf-brightblue_1701195858__78176.original_u75ege.png"
                alt="Ignatius Book Fairs"
                className="rounded-none"
                width="180px"
                height="76px"
              />
            </a>
            <div className="hidden items-center gap-2 md:flex font-brother-1816">
              <a
                className="rounded-md bg-transparent px-4 py-2 uppercase text-white hover:opacity-70"
                href={ibcUrl}
              >
                Book Fairs
              </a>
              <a
                href={ibcUrl}
                className="text-ibc-orange rounded-md bg-transparent bg-white px-4 py-2 uppercase"
              >
                Shop
              </a>
              <a
                className="rounded-md bg-transparent px-4 py-2 uppercase text-white hover:opacity-70"
                href="https://afvapnqh.donorsupport.co/-/XAKURTAP"
              >
                Donate
              </a>
            </div>
          </div>
        </div>

        <div className="bg-light-page-bg ibc-container relative z-40 py-8 lg:py-16">
          <div className="ibc-container-fixed">
            <h1 className="text-ibc-blue items flex justify-between text-3xl font-semibold capitalize mb-0">
              Checkout
              <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover text-primary bg-ibc-gray p-0">
                <a
                  className="flex h-full w-full items-center justify-center px-2"
                  href={`${ibcUrl}/cart`}
                >
                  Edit Cart
                </a>
              </button>
            </h1>
            <div className="grid grid-cols-3 gap-8 py-10">
              <div className="max-lg:col-span-3 lg:col-span-2">{this.renderContent()}</div>
              <div className="max-lg:col-span-3 lg:col-span-1">
                <LazyContainer>
                  <CartSummary />
                </LazyContainer>
              </div>
            </div>
          </div>
        </div>

        {errorModal}
      </div>
    );
  }

  private renderContent(): ReactNode {
    const {
      isPending,
      loginUrl,
      promotions = [],
      steps,
      isShowingWalletButtonsOnTop,
      extensionState,
    } = this.props;

    const { activeStepType, defaultStepType, isCartEmpty, isRedirecting } = this.state;

    if (isCartEmpty) {
      return <EmptyCartMessage loginUrl={loginUrl} waitInterval={3000} />;
    }

    const isPaymentStepActive = activeStepType
      ? activeStepType === CheckoutStepType.Payment
      : defaultStepType === CheckoutStepType.Payment;

    return (
      <LoadingOverlay hideContentWhenLoading isLoading={isRedirecting}>
        <div>
          <LoadingNotification
            isLoading={
              (!isShowingWalletButtonsOnTop && isPending) ||
              extensionState.isShowingLoadingIndicator
            }
          />

          <PromotionBannerList promotions={promotions} />

          {isShowingWalletButtonsOnTop && this.state.buttonConfigs?.length > 0 && (
            <CheckoutButtonContainer
              checkEmbeddedSupport={this.checkEmbeddedSupport}
              isPaymentStepActive={isPaymentStepActive}
              onUnhandledError={this.handleUnhandledError}
              onWalletButtonClick={this.handleWalletButtonClick}
            />
          )}

          <div className="w-full p-0">
            {steps
              .filter((step) => step.isRequired)
              .map((step) =>
                this.renderStep({
                  ...step,
                  isActive: activeStepType
                    ? activeStepType === step.type
                    : defaultStepType === step.type,
                  isBusy: isPending,
                }),
              )}
          </div>
        </div>
      </LoadingOverlay>
    );
  }

  private renderStep(step: CheckoutStepStatus): ReactNode {
    switch (step.type) {
      case CheckoutStepType.Customer:
        return (
          <CustomerStep email={this.state.customer?.email || this.state.billingAddress?.email} />
        );

      case CheckoutStepType.Shipping:
        return (
          <ShippingStep address={this.state.shippingAddress!} checkout={this.state.checkout} />
        );

      case CheckoutStepType.Billing:
        return <BillingStep address={this.state.billingAddress!} />;

      case CheckoutStepType.Payment:
        return this.renderPaymentStep(step);

      default:
        return null;
    }
  }

  private renderPaymentStep(step: CheckoutStepStatus): ReactNode {
    const { consignments, cart, errorLogger } = this.props;

    return (
      <CheckoutStep
        {...step}
        heading={<TranslatedString id="payment.payment_heading" />}
        key={step.type}
        onEdit={this.handleEditStep}
        onExpanded={this.handleExpanded}
      >
        <LazyContainer loadingSkeleton={<ChecklistSkeleton />}>
          <Payment
            checkEmbeddedSupport={this.checkEmbeddedSupport}
            errorLogger={errorLogger}
            isEmbedded={isEmbedded()}
            isUsingMultiShipping={
              cart && consignments ? isUsingMultiShipping(consignments, cart.lineItems) : false
            }
            onCartChangedError={this.handleCartChangedError}
            onFinalize={this.navigateToOrderConfirmation}
            onReady={this.handleReady}
            onSubmit={this.navigateToOrderConfirmation}
            onSubmitError={this.handleError}
            onUnhandledError={this.handleUnhandledError}
          />
        </LazyContainer>
      </CheckoutStep>
    );
  }

  private navigateToStep(type: CheckoutStepType, options?: { isDefault?: boolean }): void {
    const { clearError, error, steps } = this.props;
    const { activeStepType } = this.state;
    const step = find(steps, { type });

    if (!step) {
      return;
    }

    if (activeStepType === step.type) {
      return;
    }

    if (options && options.isDefault) {
      this.setState({ defaultStepType: step.type });
    } else {
      this.setState({ activeStepType: step.type });
    }

    if (error) {
      clearError(error);
    }
  }

  private navigateToNextIncompleteStep: (options?: { isDefault?: boolean }) => void = (options) => {
    const { steps, analyticsTracker } = this.props;
    const activeStepIndex = findIndex(steps, { isActive: true });
    const activeStep = activeStepIndex >= 0 && steps[activeStepIndex];

    if (!activeStep) {
      return;
    }

    const previousStep = steps[Math.max(activeStepIndex - 1, 0)];

    if (previousStep) {
      analyticsTracker.trackStepCompleted(previousStep.type);
    }

    this.navigateToStep(activeStep.type, options);
  };

  private navigateToOrderConfirmation: (orderId?: number) => void = (orderId) => {
    const { steps, analyticsTracker } = this.props;

    analyticsTracker.trackStepCompleted(steps[steps.length - 1].type);

    if (this.embeddedMessenger) {
      this.embeddedMessenger.postComplete();
    }

    SubscribeSessionStorage.removeSubscribeStatus();

    this.setState({ isRedirecting: true }, () => {
      navigateToOrderConfirmation(orderId);
    });
  };

  private checkEmbeddedSupport: (methodIds: string[]) => boolean = (methodIds) => {
    const { embeddedSupport } = this.props;

    return embeddedSupport.isSupported(...methodIds);
  };

  private handleCartChangedError: (error: CartChangedError) => void = () => {
    this.navigateToStep(CheckoutStepType.Shipping);
  };

  private handleConsignmentsUpdated: (state: CheckoutSelectors) => void = ({ data }) => {
    const {
      hasSelectedShippingOptions: prevHasSelectedShippingOptions,
      activeStepType,
      defaultStepType,
    } = this.state;

    const { steps } = this.props;

    const newHasSelectedShippingOptions = hasSelectedShippingOptions(data.getConsignments() || []);

    const isDefaultStepPaymentOrBilling =
      !activeStepType &&
      (defaultStepType === CheckoutStepType.Payment ||
        defaultStepType === CheckoutStepType.Billing);

    const isShippingStepFinished =
      findIndex(steps, { type: CheckoutStepType.Shipping }) <
        findIndex(steps, { type: activeStepType }) || isDefaultStepPaymentOrBilling;

    if (
      prevHasSelectedShippingOptions &&
      !newHasSelectedShippingOptions &&
      isShippingStepFinished
    ) {
      this.navigateToStep(CheckoutStepType.Shipping);
      this.setState({ error: new ShippingOptionExpiredError() });
    }

    this.setState({ hasSelectedShippingOptions: newHasSelectedShippingOptions });
  };

  private handleCloseErrorModal: () => void = () => {
    this.setState({ error: undefined });
  };

  private handleExpanded: (type: CheckoutStepType) => void = (type) => {
    const { analyticsTracker } = this.props;

    analyticsTracker.trackStepViewed(type);
  };

  private handleUnhandledError: (error: Error) => void = (error) => {
    this.handleError(error);

    // For errors that are not caught and handled by child components, we
    // handle them here by displaying a generic error modal to the shopper.
    this.setState({ error });
  };

  private handleError: (error: Error) => void = (error) => {
    const { errorLogger } = this.props;

    errorLogger.log(error);

    if (this.embeddedMessenger) {
      this.embeddedMessenger.postError(error);
    }
  };

  private handleEditStep: (type: CheckoutStepType) => void = (type) => {
    this.navigateToStep(type);
  };

  private handleReady: () => void = () => {
    this.navigateToNextIncompleteStep({ isDefault: true });
  };

  private handleBeforeExit: () => void = () => {
    const { analyticsTracker } = this.props;

    analyticsTracker.exitCheckout();
  };

  private handleWalletButtonClick: (methodName: string) => void = (methodName) => {
    const { analyticsTracker } = this.props;

    analyticsTracker.walletButtonClick(methodName);
  };
}

export default withExtension(
  withAnalytics(withLanguage(withCheckout(mapToCheckoutProps)(Checkout))),
);
