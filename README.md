# Retail Digital Banking (demo consumer app)

Angular application consuming the shared design system `@bofa/ds`
(`katherinee-li/bofa-demo-ui-kit`). Stands in for a customer-facing retail banking app during an
Angular 14→18 migration demo.

## Current state

| Item | Value |
|---|---|
| Angular | 18.2.x |
| Angular Material | 18.2.x |
| Node | 18.x |
| Library dependency | `@bofa/ds` installed from `vendor/bofa-ds-5.0.0.tgz` (stands in for the internal registry) |

## Commands

```bash
npm ci
npx ng build
npx ng test --watch=false --browsers=ChromeHeadless   # 9 specs
npx ng serve                                          # http://localhost:4200
```

## What it exercises

- **Dashboard** — account cards, a dismissible fraud alert, the transaction table, and the statement
  period tabs, all from `@bofa/ds`.
- **Transfer** — reactive form using the design system currency input, with an MFA step-up path for
  transfers ≥ $1,000.
- **Auth** — `AuthService` and a class-based `CanActivate` guard standing in for the internal SSO/MFA
  client.
- **Analytics** — `ANALYTICS_SDK` injection token standing in for the proprietary analytics SDK, with a
  console implementation for use outside the corporate network.

The auth, analytics, and account services are local stubs: the point is to reproduce the *coupling
shape* of the real app (injection-token-provided vendor SDK, guard-protected routes, currency
formatting) so an upgrade touches the same seams.

## Updating the library dependency

```bash
cd ../ui-kit && npx ng build ds && cd dist/ds && npm pack
cp bofa-ds-*.tgz ../../../banking-app/vendor/
cd ../../../banking-app && npm install file:vendor/bofa-ds-<version>.tgz
```
