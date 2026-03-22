# Ignatius Book Club Checkout

This is a fork of [Checkout JS](https://github.com/bigcommerce/checkout-js). 

Checkout JS is a browser-based application providing a seamless UI for BigCommerce shoppers to complete their checkout. It is also known as [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout), which is currently the recommended checkout option for all BigCommerce stores.

This application runs on [Vercel](https://vercel.com/ignatius-book-club/ignatius-book-club-checkout). It is loaded on a bigcommerce hosted page by entering the `auto-loader` url in checkout settings. Bigcommerce will load this custom checkout page when users go to checkout.

## Requirements

In order to build from the source code, you must have the following set up in your development environment.

* Node >= v16.
* NPM >= v8.
* Unix-based operating system. (WSL on Windows)

One of the simplest ways to install Node is using [NVM](https://github.com/nvm-sh/nvm#installation-and-update). You can follow their instructions to set up your environment if it is not already set up.

## Development

Once you have cloned the repository and set up your environment, you can start developing with it.

First, you have to pull in the dependencies required for the application.

```sh
npm ci
```

After that, you can make changes to the source code and run the following command to build it.

```sh
npm run build
```

If you are developing the application locally and want to build the source code in watch mode, you can run the following command:

```sh
npm run dev
```

After that, you need to push the prerelease tag to your fork so it can be referenced remotely.

## Custom Checkout installation

Follow [this guide](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/installing-custom-checkouts) for instructions on how to fork and install this app as a Custom Checkout in your store.

If you want to test your checkout implementation, you can run:
```sh
npm run dev:server
```

And enter the local URL for `auto-loader-dev.js` in Checkout Settings, e.g `http://127.0.0.1:8080/auto-loader-dev.js`

## Staging environment

To test changes in the staging environment, merge your changes to the staging branch and wait for the build to complete successfully in vercel.

In order to load the correct version, you'll need to update the loader url in checkout settings to `https://staging.checkout.ignatiusbookfairs.com/auto-loader.js`

Once ready, you can go through a checkout flow at the staging domain, `https://staging.store.ignatiusbookfairs.com`.

Remember, if you go back to making local changes and want to preview them, you'll need to change the loader settings back to the local url.

## Release

Once changes are ready to go live, merged them into the master branch. This will trigger another build in vercel that will be deployed to the production site.

