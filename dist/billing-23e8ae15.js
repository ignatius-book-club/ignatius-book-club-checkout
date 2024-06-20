"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[876],{69247:(e,t,n)=>{n.r(t),n.d(t,{default:()=>be});var o=n(97582),r=n(91074),s=n(67627),a=n(92574),i=n(19053),l=n(19945);function d(e,t){return!(!e||!t)&&((0,r.isEqual)(c(e),c(t))&&function(e,t){if(e.stateOrProvince&&e.stateOrProvince===t.stateOrProvince)return!0;if(e.stateOrProvinceCode&&e.stateOrProvinceCode===t.stateOrProvinceCode)return!0;return e.stateOrProvince===t.stateOrProvince&&e.stateOrProvinceCode===t.stateOrProvinceCode}(e,t))}function c(e){return(0,r.omit)((0,o.__assign)((0,o.__assign)({},e),{customFields:(e.customFields||[]).filter((function(e){return!!e.fieldValue}))}),["id","shouldSaveAddress","stateOrProvince","stateOrProvinceCode","type","email","country"])}var u=n(69638),p=n(55409),m=n(76741);function g(e){return t=e.lineItems.physicalItems.filter((function(e){return!e.addedByPromotion})),(0,r.reduce)(t,(function(e,t){return e+t.quantity}),0);var t}var h=n(98119),f=n(76417),v=n(19686),_=n(56204),y=n(78163),C=n(33497);var E=n(58612),b=n(63360),S=n(24994),A=n(13627);const P=(0,_.Z)((function(e){var t=e.selectedAddress,n=e.language,o=e.type,r=(0,s.useState)(!1),i=r[0],l=r[1];return s.createElement("a",{"aria-controls":"addressDropdown","aria-description":n.translate("address.enter_or_select_address_action"),"aria-expanded":i,className:"button dropdown-button dropdown-toggle--select","data-test":"address-select-button",href:"#",id:"addressToggle",onBlur:function(){return l(!1)},onClick:(0,E.Z)((function(){return l(!i)}))},t?s.createElement(A.Z,{address:t,type:o}):s.createElement(a.Z,{id:"address.enter_address_action"}))}));var w=function(e){var t=e.addresses,n=e.onSelectAddress,o=e.onUseNewAddress,r=e.selectedAddress,i=e.type;return s.createElement("ul",{className:"dropdown-menu instrumentSelect-dropdownMenu",id:"addressDropdown"},s.createElement("li",{className:"dropdown-menu-item dropdown-menu-item--select"},s.createElement("a",{"data-test":"add-new-address",href:"#",onClick:(0,E.Z)((function(){return o(r)}))},s.createElement(a.Z,{id:"address.enter_address_action"}))),t.map((function(e){return s.createElement("li",{className:"dropdown-menu-item dropdown-menu-item--select","data-test":"address-select-option",key:e.id},s.createElement("a",{href:"#","data-test":"address-select-option-action",onClick:(0,E.Z)((function(){return n(e)}))},s.createElement(A.Z,{address:e,type:i})))})))};const Z=(0,s.memo)((function(e){var t=e.addresses,n=e.selectedAddress,o=e.type,r=e.onSelectAddress,a=e.onUseNewAddress,i=(0,y.Z)().shouldShowPayPalFastlaneLabel;return s.createElement("div",{className:"form-field"},s.createElement("div",{className:"dropdown--select"},s.createElement(S.Z,{dropdown:s.createElement(w,{addresses:t,onSelectAddress:function(e){d(n,e)||r(e)},onUseNewAddress:function(){a(n)},selectedAddress:n,type:o})},s.createElement(P,{addresses:t,selectedAddress:n,type:o}))),i&&s.createElement(b.Z,null))}));var k=n(75667),F=n(55375),I=n(47086),O=n(78379),N=n(20157),x=n(59826),L={address1:"addressLine1",address2:"addressLine2",postalCode:"postCode",stateOrProvince:"province",stateOrProvinceCode:"provinceCode"};function V(e){return"".concat(L[e]||e)}function T(e){return"".concat(V(e),"Input")}const M=function(){function e(e){var t=e.address_components,n=e.name;this._name=n,this._address=t}return e.prototype.getState=function(){return this._get("administrative_area_level_1","short_name")},e.prototype.getStreet=function(){return this._name},e.prototype.getStreet2=function(){return"NZ"===this.getCountry()?this._get("sublocality","short_name"):this._get("subpremise","short_name")},e.prototype.getCity=function(){return this._get("postal_town","long_name")||this._get("locality","long_name")||this._get("neighborhood","short_name")},e.prototype.getCountry=function(){return this._get("country","short_name")},e.prototype.getPostCode=function(){return this._get("postal_code","short_name")},e.prototype._get=function(e,t){var n=this._address&&this._address.find((function(t){return-1!==t.types.indexOf(e)}));return n?n[t]:""},e}();const B=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return(0,o.__extends)(t,e),t.prototype.getCity=function(){return this._get("sublocality_level_1","long_name")||this._get("locality","long_name")},t}(M);const R=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return(0,o.__extends)(t,e),t.prototype.getState=function(){return""},t.prototype.getStreet2=function(){return this._get("locality","long_name")},t.prototype.getPostCode=function(){return""},t}(M);const U=function(){function e(){}return e.create=function(e){var t,n=null===(t=e.address_components)||void 0===t?void 0:t.find((function(e){return e.types.indexOf("country")>=0}));switch((null==n?void 0:n.short_name)||""){case"GB":return new R(e);case"CA":return new B(e);default:return new M(e)}},e}();var K=n(696),z=n.n(K),D=n(64553),H=n(92963),W=n(6904);const j=function(e){var t=e.children;return s.createElement("div",{className:"popover"},t)};function q(e,t){var n=["popoverList-item"];return e===t&&n.push("is-active"),n.join(" ")}const G=(0,s.memo)((function(e){var t=e.highlightedIndex,n=void 0===t?-1:t,r=e.testId,a=e.getItemProps,i=void 0===a?function(e){return e}:a,l=e.menuProps,d=void 0===l?{}:l,c=e.items;return c.length?s.createElement("ul",(0,o.__assign)({className:"popoverList","data-test":r},d),c.map((function(e,t){return s.createElement("li",(0,o.__assign)({className:q(n,t),"data-test":r&&"".concat(r,"-item")},i({key:e.id,index:t,item:e}),{key:t}),e.content)}))):null}));const J=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.stateReducer=function(e,n){var r=t.props.onChange;switch(n.type){case W.ZP.stateChangeTypes.blurInput:case W.ZP.stateChangeTypes.blurButton:case W.ZP.stateChangeTypes.mouseUp:case W.ZP.stateChangeTypes.touchEnd:return(0,o.__assign)((0,o.__assign)({},n),{inputValue:e.inputValue});case W.ZP.stateChangeTypes.changeInput:return n.inputValue!==e.inputValue&&r&&r(n.inputValue||"",e.isOpen),n;case W.ZP.stateChangeTypes.keyDownEnter:default:return n}},t.handleStateChange=function(e){var n=e.isOpen,o=e.inputValue,s=t.props.onToggleOpen,a=void 0===s?r.noop:s;void 0!==n&&a({isOpen:n,inputValue:o||""})},t}return(0,o.__extends)(t,e),t.prototype.render=function(){var e=this,t=this.props,n=t.inputProps,a=t.initialValue,i=t.initialHighlightedIndex,l=t.defaultHighlightedIndex,d=t.items,c=t.children,u=t.onSelect,p=t.listTestId;return s.createElement(W.ZP,{defaultHighlightedIndex:l,initialHighlightedIndex:i,initialInputValue:a,itemToString:this.itemToString,labelId:n&&n["aria-labelledby"]?n["aria-labelledby"]:null,onChange:u,onStateChange:this.handleStateChange,stateReducer:this.stateReducer},(function(t){var a=t.isOpen,i=t.getInputProps,l=t.getMenuProps,u=t.getItemProps,m=t.highlightedIndex,g=(0,o.__assign)((0,o.__assign)({},i()),n);return delete g.labelText,s.createElement("div",null,s.createElement("input",(0,o.__assign)({},g)),n&&(0,r.includes)(n.className,"floating")&&s.createElement(D.Z,{htmlFor:n.id,id:n["aria-labelledby"],isFloatingLabelEnabled:!0},n.labelText),a&&!!d.length&&s.createElement(j,null,s.createElement(G,{getItemProps:u,highlightedIndex:(0,r.isNumber)(m)?m:-1,items:d.map((function(t){return e.toPopoverItem(t)})),menuProps:l(),testId:p}),c))}))},t.prototype.toPopoverItem=function(e){return(0,o.__assign)((0,o.__assign)({},e),{content:this.highlightItem(e)})},t.prototype.highlightItem=function(e){if(!e.highlightedSlices||!e.highlightedSlices.length)return e.label;var t=0,n=0;return e.highlightedSlices.reduce((function(o,r,a){var i=e.label,l=r.offset,d=r.length,c=l-t;return c&&(o.push(s.createElement(s.Fragment,{key:n},i.substr(t,c))),n+=1),t=l+d,o.push(s.createElement("strong",{key:n},i.substr(l,d))),n+=1,a===(e.highlightedSlices||[]).length-1&&(o.push(s.createElement(s.Fragment,{key:n},i.substr(t))),n+=1),o}),[])},t.prototype.itemToString=function(e){return e&&e.value||""},t}(s.PureComponent);var Q=n(33327);const X=function(){function e(){this._scriptLoader=(0,Q.getScriptLoader)()}return e.prototype.loadMapsSdk=function(e){var t=this;return this._googleAutoComplete||(this._googleAutoComplete=new Promise((function(n,o){var r="initAutoComplete",s=["language=en","key=".concat(e),"libraries=places","callback=".concat(r)].join("&");window[r]=function(){(function(e){var t=e;return Boolean(t.google&&t.google.maps&&t.google.maps.places)})(window)&&n(window.google.maps),o()},t._scriptLoader.loadScript("//maps.googleapis.com/maps/api/js?".concat(s)).catch((function(e){throw t._googleAutoComplete=void 0,e}))}))),this._googleAutoComplete},e}();var Y;const $=function(){function e(e,t){void 0===t&&(Y||(Y=new X),t=Y),this._apiKey=e,this._scriptLoader=t}return e.prototype.getAutocompleteService=function(){return this._autocompletePromise||(this._autocompletePromise=this._scriptLoader.loadMapsSdk(this._apiKey).then((function(e){if(!e.places.AutocompleteService)throw new Error("`AutocompleteService` is undefined");return new e.places.AutocompleteService}))),this._autocompletePromise},e.prototype.getPlacesServices=function(){var e=document.createElement("div");return this._placesPromise||(this._placesPromise=this._scriptLoader.loadMapsSdk(this._apiKey).then((function(t){if(!t.places.PlacesService)throw new Error("`PlacesService` is undefined");return new t.places.PlacesService(e)}))),this._placesPromise},e}();const ee=function(e){function t(t){var n=e.call(this,t)||this;return n.onSelect=function(e){var t=n.props,o=t.fields,s=t.onSelect,a=void 0===s?r.noop:s,i=t.nextElement;n.googleAutocompleteService.getPlacesServices().then((function(t){t.getDetails({placeId:e.id,fields:o||["address_components","name"]},(function(t){i&&i.focus(),a(t,e)}))}))},n.onChange=function(e){var t=n.props,o=t.isAutocompleteEnabled,s=t.onChange;if((void 0===s?r.noop:s)(e,!1),!o)return n.resetAutocomplete();n.setAutocomplete(e),n.setItems(e)},n.googleAutocompleteService=new $(t.apiKey),n.state={items:[],autoComplete:"off"},n}return(0,o.__extends)(t,e),t.prototype.render=function(){var e=this.props,t=e.initialValue,n=e.onToggleOpen,a=void 0===n?r.noop:n,i=e.inputProps,l=void 0===i?{}:i,d=this.state,c=d.autoComplete,u=d.items;return s.createElement(J,{defaultHighlightedIndex:-1,initialHighlightedIndex:-1,initialValue:t,inputProps:(0,o.__assign)((0,o.__assign)({},l),{autoComplete:c}),items:u,listTestId:"address-autocomplete-suggestions",onChange:this.onChange,onSelect:this.onSelect,onToggleOpen:a},s.createElement("div",{className:"co-googleAutocomplete-footer"}))},t.prototype.setItems=function(e){var t=this;if(e){var n=this.props,o=n.componentRestrictions,r=n.types;this.googleAutocompleteService.getAutocompleteService().then((function(n){n.getPlacePredictions({input:e,types:r||["geocode"],componentRestrictions:o},(function(e){return t.setState({items:t.toAutocompleteItems(e)})}))}))}else this.setState({items:[]})},t.prototype.resetAutocomplete=function(){this.setState({items:[],autoComplete:"off"})},t.prototype.setAutocomplete=function(e){this.setState((0,o.__assign)((0,o.__assign)({},this.state),{autoComplete:e&&e.length?"nope":"off"}))},t.prototype.toAutocompleteItems=function(e){return(e||[]).map((function(e){return{label:e.description,value:e.structured_formatting.main_text,highlightedSlices:e.matched_substrings,id:e.place_id}}))},t}(s.PureComponent);const te=(0,s.memo)((function(e){var t=e.field,n=t.default,o=t.name,r=t.maxLength,i=e.countryCode,l=e.supportedCountries,d=e.parentFieldName,c=e.nextElement,u=e.apiKey,p=e.onSelect,m=e.onChange,g=e.onToggleOpen,h=e.isFloatingLabelEnabled,f=d?"".concat(d,".").concat(o):o,v=(0,s.useMemo)((function(){return s.createElement(a.Z,{id:"address.address_line_1_label"})}),[]),_=function(e){return"".concat(V(e),"Label")}(o),y=(0,s.useMemo)((function(){return{className:z()("form-input optimizedCheckout-form-input",{"floating-input":h}),id:T(o),"aria-labelledby":_,placeholder:h?" ":n,labelText:h?v:null,maxLength:r||void 0}}),[o,_,n,v,r]),C=(0,s.useCallback)((function(e){var t=e.field;return s.createElement(ee,{apiKey:u,componentRestrictions:i?{country:i}:void 0,initialValue:t.value,inputProps:y,isAutocompleteEnabled:!!i&&l.indexOf(i)>-1,nextElement:c,onChange:m,onSelect:p,onToggleOpen:g})}),[u,i,y,c,m,p,g,l]),E=h?null:s.createElement(D.Z,{htmlFor:y.id,id:_,isFloatingLabelEnabled:h},v);return s.createElement("div",{className:z()("dynamic-form-field dynamic-form-field--addressLineAutocomplete",{"floating-form-field":h}),"data-test":"google-autocomplete-form-field"},s.createElement(H.Z,{input:C,isFloatingLabelEnabled:h,label:E,name:f}))}));var ne={address1:"address.address_line_1_label",address2:"address.address_line_2_label",city:"address.city_label",company:"address.company_name_label",countryCode:"address.country_label",firstName:"address.first_name_label",lastName:"address.last_name_label",phone:"address.phone_number_label",postalCode:"address.postal_code_label",stateOrProvince:"address.state_label",stateOrProvinceCode:"address.state_label"},oe={address1:"address-line1",address2:"address-line2",city:"address-level2",company:"organization",countryCode:"country",firstName:"given-name",lastName:"family-name",phone:"tel",postalCode:"postal-code",stateOrProvince:"address-level1",stateOrProvinceCode:"address-level1"},re={countryCode:"address.select_country_action",stateOrProvince:"address.select_state_action",stateOrProvinceCode:"address.select_state_action"},se="address1",ae=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.containerRef=(0,s.createRef)(),t.handleDynamicFormFieldChange=(0,F.memoize)((function(e){return function(n){t.syncNonFormikValue(e,n)}})),t.handleAutocompleteChange=function(e,n){n||t.syncNonFormikValue(se,e)},t.handleAutocompleteSelect=function(e,n){var s=n.value,a=t.props,i=a.countries,l=a.setFieldValue,d=void 0===l?r.noop:l,c=a.onChange,u=void 0===c?r.noop:c,p=function(e,t){if(void 0===t&&(t=[]),!e||!e.address_components)return{};var n=U.create(e),r=n.getState(),s=n.getCountry(),a=t&&t.find((function(e){return s===e.code})),i=n.getStreet2();return(0,o.__assign)({address2:i,city:n.getCity(),countryCode:s,postalCode:n.getPostCode()},r?function(e,t){void 0===t&&(t=[]);var n=t.find((function(t){var n=t.code,o=t.name;return n===e||o===e}));return n?{stateOrProvince:n.name,stateOrProvinceCode:n.code}:{stateOrProvince:t.length?"":e,stateOrProvinceCode:""}}(r,a&&a.subdivisions):{})}(e,i);(0,r.forIn)(p,(function(e,t){d(t,e),u(t,e)})),s&&t.syncNonFormikValue(se,s)},t.syncNonFormikValue=function(e,n){var o=t.props,s=o.formFields,a=o.setFieldValue,i=void 0===a?r.noop:a,l=o.onChange,d=void 0===l?r.noop:l,c=s.filter((function(e){return e.custom&&e.fieldType===I.Z.date})).map((function(e){return e.name}));(e===se||c.indexOf(e)>-1)&&i(e,n),d(e,n)},t}return(0,o.__extends)(t,e),t.prototype.componentDidMount=function(){var e=this.containerRef.current;e&&(this.nextElement=e.querySelector('[autocomplete="address-line2"]'))},t.prototype.render=function(){var e=this,t=this.props,n=t.formFields,o=t.fieldName,r=t.countriesWithAutocomplete,i=t.countryCode,l=t.googleMapsApiKey,d=t.onAutocompleteToggle,c=t.shouldShowSaveAddress,u=t.isFloatingLabelEnabled;return s.createElement(s.Fragment,null,s.createElement(O.Z,null,s.createElement("div",{className:"checkout-address",ref:this.containerRef},n.map((function(t){var n=t.name,c=re[n];return"address1"===n&&l&&r?s.createElement(te,{apiKey:l,countryCode:i,field:t,isFloatingLabelEnabled:u,key:t.id,nextElement:e.nextElement||void 0,onChange:e.handleAutocompleteChange,onSelect:e.handleAutocompleteSelect,onToggleOpen:d,parentFieldName:o,supportedCountries:r}):s.createElement(N.Z,{autocomplete:oe[t.name],extraClass:"dynamic-form-field--".concat(V(n)),field:t,inputId:T(n),isFloatingLabelEnabled:u,key:"".concat(t.id,"-").concat(t.name),label:t.custom?t.label:s.createElement(a.Z,{id:ne[t.name]}),onChange:e.handleDynamicFormFieldChange(n),parentFieldName:t.custom?o?"".concat(o,".customFields"):"customFields":o,placeholder:e.getPlaceholderValue(t,c)})})))),c&&s.createElement(x.Z,{labelContent:s.createElement(a.Z,{id:"address.save_in_addressbook"}),name:o?"".concat(o,".shouldSaveAddress"):"shouldSaveAddress"}))},t.prototype.getPlaceholderValue=function(e,t){var n=this.props.language;return e.default&&"dropdown"!==e.fieldType?e.default:t&&n.translate(t)},t}(s.Component);const ie=(0,_.Z)(ae);var le=n(96543),de=n(34323),ce=n(17175),ue=n(7936);const pe=function(){var e=(0,s.useCallback)((function(e){return s.createElement(D.Z,{hidden:!0,htmlFor:e},s.createElement(a.Z,{id:"shipping.order_comment_label"}))}),[]),t=(0,s.useCallback)((function(e){var t=e.field;return s.createElement(ue.Z,(0,o.__assign)({},t,{autoComplete:"off",maxLength:2e3}))}),[]),n=(0,s.useMemo)((function(){return s.createElement(h.Z,null,s.createElement(a.Z,{id:"shipping.order_comment_label"}))}),[]);return s.createElement(O.Z,{legend:n,testId:"checkout-shipping-comments"},s.createElement(H.Z,{input:t,label:e,name:"orderComment",id:"orderComment"}))};var me=n(60452),ge=n(16206),he=n(45855),fe=n(77683);const ve=(0,_.Z)((0,f.withFormik)({handleSubmit:function(e,t){(0,t.props.onSubmit)(e)},mapPropsToValues:function(e){var t=e.getFields,n=e.customerMessage,r=e.billingAddress;return(0,o.__assign)((0,o.__assign)({},(0,le.Z)(t(r&&r.countryCode),r)),{orderComment:n})},isInitialValid:function(e){var t=e.billingAddress,n=e.getFields,o=e.language;return!!t&&(0,de.Z)({language:o,formFields:n(t.countryCode)}).isValidSync(t)},validationSchema:function(e){var t=e.language,n=e.getFields;return"amazonpay"===e.methodId?(0,v.Vo)((function(e){return(0,ce.Z)({translate:(0,de.w)(t),formFields:n(e&&e.countryCode)})})):(0,v.Vo)((function(e){return(0,de.Z)({language:t,formFields:n(e&&e.countryCode)})}))},enableReinitialize:!0})((function(e){var t=e.googleMapsApiKey,n=e.billingAddress,l=e.countriesWithAutocomplete,c=e.customer,u=c.addresses,p=c.isGuest,m=e.getFields,g=e.countries,h=e.isUpdating,f=e.setFieldValue,v=e.shouldShowOrderComments,_=e.values,E=e.methodId,b=e.isFloatingLabelEnabled,S=e.updateAddress,A=e.onUnhandledError,P=(0,s.useState)(!1),w=P[0],F=P[1],I=(0,s.useRef)(null),N=(0,y.Z)(),x=N.isPayPalFastlaneEnabled,L=N.mergedBcAndPayPalFastlaneAddresses,V="amazonpay"===E,T=m(_.countryCode),M=T.filter((function(e){return e.custom})),B=M.length>0,R=V&&B?M:T,U=x?L:u,K=(null==U?void 0:U.length)>0,z=n&&function(e,t,n){return!(!e||!(0,C.Z)(e,n))&&(0,r.some)(t,(function(t){return d(t,e)}))}(n,U,m(n.countryCode)),D=function(e){return(0,o.__awaiter)(void 0,void 0,void 0,(function(){var t;return(0,o.__generator)(this,(function(n){switch(n.label){case 0:F(!0),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,S(e)];case 2:return n.sent(),[3,5];case 3:return(t=n.sent())instanceof Error&&A(t),[3,5];case 4:return F(!1),[7];case 5:return[2]}}))}))};return s.createElement(ge.Z,{autoComplete:"on"},V&&n&&s.createElement("div",{className:"form-fieldset"},s.createElement(fe.Z,{address:n})),s.createElement(O.Z,{id:"checkoutBillingAddress",ref:I},K&&!V&&s.createElement(O.Z,{id:"billingAddresses"},s.createElement(he.Z,{isLoading:w},s.createElement(Z,{addresses:U,onSelectAddress:D,onUseNewAddress:function(){D({})},selectedAddress:z?n:void 0,type:k.Z.Billing}))),!z&&s.createElement(i.Z,{isLoading:w},s.createElement(ie,{countries:g,countriesWithAutocomplete:l,countryCode:_.countryCode,formFields:R,googleMapsApiKey:t,isFloatingLabelEnabled:b,setFieldValue:f,shouldShowSaveAddress:!p}))),v&&s.createElement(pe,null),s.createElement("div",{className:"form-actions"},s.createElement(me.ZP,{disabled:h||w,id:"checkout-billing-continue",isLoading:h||w,type:"submit",variant:me.Wu.Primary},s.createElement(a.Z,{id:"common.continue_action"}))))})));var _e=n(10631),ye=n(56851);function Ce(e){var t=function(e){return(e&&e.payments?e.payments:[]).find((function(e){return!(0,_e.Z)(e)&&!(0,ye.Z)(e)&&!!e.providerId}))}(e);return t&&["amazonpay"].indexOf(t.providerId)>-1?t.providerId:void 0}var Ee=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleSubmit=function(e){return(0,o.__awaiter)(t,void 0,void 0,(function(){var t,n,r,s,a,i,c,u,p,m,g=e.orderComment,h=(0,o.__rest)(e,["orderComment"]);return(0,o.__generator)(this,(function(e){switch(e.label){case 0:t=this.props,n=t.updateAddress,r=t.updateCheckout,s=t.customerMessage,a=t.billingAddress,i=t.navigateNextStep,c=t.onUnhandledError,u=[],(p=function(e){var t=e.customFields,n=(0,o.__rest)(e,["customFields"]),r=e.shouldSaveAddress;return(0,o.__assign)((0,o.__assign)({},n),{shouldSaveAddress:r,customFields:(0,l.Z)(t)})}(h))&&!d(p,a)&&u.push(n(p)),s!==g&&u.push(r({customerMessage:g})),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Promise.all(u)];case 2:return e.sent(),i(),[3,4];case 3:return(m=e.sent())instanceof Error&&c(m),[3,4];case 4:return[2]}}))}))},t}return(0,o.__extends)(t,e),t.prototype.componentDidMount=function(){return(0,o.__awaiter)(this,void 0,void 0,(function(){var e,t,n,s,a,i;return(0,o.__generator)(this,(function(o){switch(o.label){case 0:e=this.props,t=e.initialize,n=e.onReady,s=void 0===n?r.noop:n,a=e.onUnhandledError,o.label=1;case 1:return o.trys.push([1,3,,4]),[4,t()];case 2:return o.sent(),s(),[3,4];case 3:return(i=o.sent())instanceof Error&&a(i),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var e=this.props,t=e.updateAddress,n=e.isInitializing,r=(0,o.__rest)(e,["updateAddress","isInitializing"]);return s.createElement(i.Z,{isLoading:n},s.createElement("div",{className:"checkout-form"},s.createElement("div",{className:"form-legend-container"},s.createElement(h.Z,{testId:"billing-address-heading"},s.createElement(a.Z,{id:"billing.billing_address_heading"}))),s.createElement(ve,(0,o.__assign)({},r,{onSubmit:this.handleSubmit,updateAddress:t}))))},t}(s.Component);const be=(0,u.Z)((function(e){var t=e.checkoutService,n=e.checkoutState,o=n.data,r=o.getCheckout,s=o.getConfig,a=o.getCart,i=o.getCustomer,l=o.getBillingAddress,d=o.getBillingAddressFields,c=o.getBillingCountries,u=n.statuses,h=u.isLoadingBillingCountries,f=u.isUpdatingBillingAddress,v=u.isUpdatingCheckout,_=s(),y=i(),C=r(),E=a();if(!(_&&y&&C&&E))return null;var b=_.checkoutSettings,S=b.enableOrderComments,A=b.googleMapsApiKey,P=["US","CA","AU","NZ"];return b.features["CHECKOUT-4183.checkout_google_address_autocomplete_uk"]&&P.push("GB"),{billingAddress:l(),countries:c()||p.L,countriesWithAutocomplete:P,customer:y,customerMessage:C.customerMessage,getFields:d,googleMapsApiKey:A,initialize:t.loadBillingAddressFields,isInitializing:h(),isUpdating:f()||v(),methodId:Ce(C),shouldShowOrderComments:S&&g(E)<1,updateAddress:t.updateBillingAddress,updateCheckout:t.updateCheckout,isFloatingLabelEnabled:(0,m.Z)(_.checkoutSettings)}}))(Ee)},24994:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(97582),r=n(67627),s=n(80850),a=n(45433);const i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={shouldShow:!1},t.handleClick=function(e){t.state.shouldShow?t.handleClose(e.nativeEvent):t.handleOpen(e.nativeEvent)},t.handleOpen=function(){t.state.shouldShow||t.setState({shouldShow:!0},(function(){var e;null===(e=t.getRootElement())||void 0===e||e.addEventListener("click",t.handleClose)}))},t.handleClose=function(){t.state.shouldShow&&t.setState({shouldShow:!1},(function(){var e;null===(e=t.getRootElement())||void 0===e||e.removeEventListener("click",t.handleClose)}))},t}return(0,o.__extends)(t,e),t.prototype.componentWillUnmount=function(){document.removeEventListener("click",this.handleClose)},t.prototype.render=function(){var e=this,t=this.props,n=t.children,a=t.placement,i=t.dropdown,l=this.state.shouldShow;return r.createElement(s.dK,null,r.createElement(s.s3,null,(function(t){var o=t.ref;return r.createElement("div",{className:"dropdownTrigger",onClick:e.handleClick,ref:o},n)})),r.createElement(s.rD,{modifiers:{hide:{enabled:!1},flip:{enabled:!1},preventOverflow:{enabled:!1}},placement:a},(function(e){var t=e.ref,n=e.style;return l?r.createElement("div",{className:"dropdownMenu",ref:t,style:(0,o.__assign)((0,o.__assign)({},n),{width:"100%",zIndex:1})},i):null})))},t.prototype.getRootElement=function(){return document.getElementById(a.V)||document.getElementById(a.Z)},t.defaultProps={placement:"bottom-start"},t}(r.Component)},45433:(e,t,n)=>{n.d(t,{V:()=>o,Z:()=>r});var o="checkout-app",r="micro-app-ng-checkout"}}]);
//# sourceMappingURL=billing-23e8ae15.js.map