# Retail Digital Banking

Angular retail banking application providing account management, transfers, and transaction history. Built with the shared design system for consistent UI across banking applications.

## Features

- **Account Dashboard**: View account balances, recent transactions, and account statements
- **Transfer Funds**: Send money between accounts with multi-factor authentication for large transfers
- **Transaction History**: Searchable and sortable transaction records
- **Fraud Alerts**: Real-time security notifications and account monitoring
- **Statement Management**: Access monthly statements and documents

## Architecture

The application uses a layered architecture with dependency injection for modularity:

- **UI Layer**: Angular components using the shared design system
- **Service Layer**: Account, authentication, and analytics services
- **Guard Layer**: Route protection and authentication checks
- **Integration Layer**: External API and SDK integration points

## Development

```bash
npm ci
npx ng build
npx ng test --watch=false --browsers=ChromeHeadless
npx ng serve
```

## Dependencies

- **Angular**: 14.2.x
- **@bofa/ds**: Shared design system components
- **Angular Material**: UI component framework
- **RxJS**: Reactive programming for state management

## Authentication

The application integrates with the corporate SSO provider and includes multi-factor authentication for sensitive operations. Routes are protected by authentication guards to ensure secure access.

## Analytics

User interactions and page views are tracked through the integrated analytics SDK for business intelligence and compliance reporting.

## Security

- Multi-factor authentication for high-value transactions
- Real-time fraud detection and alerting
- Secure session management
- Compliance with banking security standards

## Version

Current version: 1.0.0
