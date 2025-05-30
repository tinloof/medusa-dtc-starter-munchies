# Medusa Breaking Changes & Migration Notes (v2.0.0 to v2.8.3)

This document summarizes breaking changes and important migration notes from Medusa releases between v2.0.0 and v2.8.3.

## v2.8.1

**Important: Fixes a regression introduced in v2.8.0**

In v2.8.0, a regression affected the ordering of products returned from the product module service. This broke workflows (e.g. `updateProductsWorkflow`) that rely on consistent ordering for subsequent operations such as applying price updates.
**It is strongly recommended to upgrade to v2.8.1 as soon as possible to avoid incorrect data if you are on v2.8.0.**

## v2.8.0

### Cart-completion robustness

**Breaking changes**

This release introduces important changes to the `completeCartWorkflow` aimed at improving robustness and making it easier to recover from failures.

**Changes to idempotency**

Until now, the workflow has had the following configuration:
```json
{
  "name": "completeCartWorkflowId",
  "store": true,
  "idempotent": true,
  "retentionTime": "THREE_DAYS"
}
```

In this release, we change the `idempotent` flag from `true` to `false`.
With `idempotent` set to `false`, it will be possible to retry failed executions, making it simpler to bring the cart to a satisfying state and eventually create the order.

Concurrency continues to be appropriately managed by passing the cart ID as the `transactionId` when running the workflow. The `transactionId` ensures that only one workflow execution can run at a time.

**Changes to the structure**

The workflow has been slightly restructured to minimize the risk of payment sessions getting stuck in a state that is difficult to recover from. More specifically, the payment authorization step has been moved to the very end of the workflow, so that all first-party checks are performed before we authorize the payment.

**Changes to the webhook handler**

The webhook handler ensures consistency between Medusa and the third-party payment provider. This release introduces functionality for handling auto-captures in the third-party payment provider.

### Line item generation

**Breaking changes**

This release changes the source of line item titles and subtitles. The title has changed from the variant title to the product title, and the subtitle has changed from the product title to the variant title.

## v2.7.0

### Support multiple payment account holders for customers

**Breaking changes**

This release adds support for a customer to have multiple account holders, therefore supporting multiple payment providers at the same time.

If you were using `customer.account_holder` in your implementation, you must change it to `customer.account_holders` and choose the relevant one for the `provider_id` you want to use.

If you haven't done anything custom with payments and account holders, there are no breaking changes.

### Changes required by plugin authors (Admin Panel)

This change has no breaking changes for general users, but requires plugin authors to update the `package.json` of their plugins to also include a `./admin` export. It should look like this:
```json
{
  "name": "@medusajs/plugin",
  "version": "0.0.1",
  "description": "A starter for Medusa plugins.",
  "author": "Medusa (https://medusajs.com)",
  "license": "MIT",
  "files": [
    ".medusa/server"
  ],
  "exports": {
    "./package.json": "./package.json",
    "./workflows": "./.medusa/server/src/workflows/index.js",
    "./.medusa/server/src/modules/*": "./.medusa/server/src/modules/*/index.js",
    "./modules/*": "./.medusa/server/src/modules/*/index.js",
    "./providers/*": "./.medusa/server/src/providers/*/index.js",
    "./*": "./.medusa/server/src/*.js",
    "./admin": {
      "import": "./.medusa/server/src/admin/index.mjs",
      "require": "./.medusa/server/src/admin/index.js",
      "default": "./.medusa/server/src/admin/index.js"
    }
  }
}
```

## v2.6.0

### Authentication improvements

**Updated token handling in password resets**

**Breaking changes**: this change is not backward compatible due to security considerations

The token for updating provider identity is now accepted as a Bearer token in the authorization header instead of query parameters.

Before:
`POST /auth/user/emailpass/update?token=ey...`

After:
`POST /auth/user/emailpass/update`
```http
// headers
{ "authorization": "Bearer ey..." }
```

This enhances security around token management, for example, by preventing token exposure in logs.
More specifically, this will affect the reset password flow that relies on this endpoint.

**Required action**:
*   In your client (e.g. Next.js storefront), move the token from query params to the authorization header

**Removed deprecated actorType from reset password event**
We have removed a long deprecated property, `actorType` from the reset password event. Instead, use the `actor_type`.

### API Routes loader refactor

**Important Note**: While these changes sound dramatic, if you have used middleware and API Routes as intended, there will be no required actions nor breaking changes for most users. However, the old API Routes loader unintentionally allowed overriding core API routes and middleware. While this behavior remains for now, it will be removed in a future release.

Key changes:
*   Plugins, Medusa core, and the application no longer use isolated router instances of Express. Global middleware and error handlers are now shared.
*   The order of registering global middleware is: core, then plugins (in order of registration), then the app.
*   The order of registering route middleware is: core, then plugins (in order of registration), then the app.
*   API Routes and middleware are sorted by specificity before registration.
*   Middleware never overrides existing middleware; they are added to the stack.

## v2.5.1

No explicit breaking changes mentioned in the highlights. Focus on new features like outlet routes, loader/handle exports for admin routes, expanded OpenTelemetry options, improved structural logging, and custom storage for JS-SDK.

## v2.5.0

### Revamped Payment Provider interface

**Breaking changes**

The payment provider interface, originally designed for Medusa V1, has now been redesigned for V2. This impacts how payment providers are implemented.

**Payment Provider interface changes**:
The methods `initiatePayment`, `updatePayment`, `deletePayment`, `authorizePayment`, `capturePayment`, `refundPayment`, `retrievePayment`, `cancelPayment`, `listPaymentMethods`, `savePaymentMethod`, and `getPaymentStatus` have updated signatures (input and output types). Refer to the [original release notes](https://github.com/medusajs/medusa/releases/tag/v2.5.0) or the `IPaymentProvider` interface in the Medusa core for detailed new signatures.

Additionally, the interface now requires payment providers to **throw errors** instead of returning them.

**Create Payment Sessions endpoint (`POST /store/payment-collections/:id/payment-sessions`)**

The `context` field has been removed from this endpoint. This change addresses a security risk. The `context` accepted by the payment module now only accepts known fields.

**Account Holders**
Support for Account Holders in payment providers was introduced (optional for providers).

### Overriding Shipping Option for Fulfillments

**Schema changes**

*   **Product <> Shipping Profile link**: Products now require a Shipping Profile upon creation. A data migration script will assign all products to the default shipping profile if it exists (profile with "default" in its name).
*   The fulfillment creation endpoint (`POST /admin/orders/:id/fulfillments`) now accepts an optional `shipping_option_id` to override the original shipping option.

### Clearing workflow_executions exceeding their retention time

**Schema changes**

A `retention_time` column was added to the `workflow_execution` table. A recurring job now clears stale workflow executions. For existing executions, retention time will be set if previously configured in workflow options (expected in seconds). If it was in milliseconds, manual migration might be needed to avoid Postgres errors.

### Other noteworthy changes

**Changes to `medusa start` command**:
The `NODE_ENV` now defaults to `production` instead of `development`.

---
*The release notes for versions v2.0.0 through v2.4.x were not explicitly detailed in the provided text from the initial `view_text_website` call beyond their titles and links. A deeper review of each of these older releases would require fetching their individual release pages if more granular breaking changes are needed. The current summary covers breaking changes explicitly called out in the "Highlights" sections of versions 2.5.0 through 2.8.1.*
