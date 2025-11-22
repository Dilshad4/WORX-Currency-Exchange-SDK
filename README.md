# WORX Currency Exchange SDK

Professional TypeScript SDK for WORX v1 Currency Exchange API. Get real-time currency exchange rates with comprehensive features including smart caching, offline conversion, and multi-language support.

[![npm version](https://badge.fury.io/js/worx-currency-sdk.svg)](https://www.npmjs.com/package/worx-currency-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🌍 Multi-Language Support**: [العربية](./README-ar.md) | [کوردی](./README-ku.md)

## Features

- 🚀 **Full TypeScript Support** - Complete type definitions and IntelliSense
- 💰 **Real-time Exchange Rates** - 17+ supported currencies including IQD, USD, EUR, GBP
- 👀 **Currency Watch Lists** - Monitor specific currencies with personalized tracking
- 📊 **Historical Data & Analytics** - Price trends, changes, and comprehensive analytics
- 🔄 **Automatic Retries** - Built-in retry logic with exponential backoff
- 🚦 **Smart Rate Limiting** - Automatic rate limit handling with subscription awareness
- 🎯 **Subscription Management** - Support for Free, Pro, Business, Platinum, and Custom plans
- 🔐 **Secure Authentication** - Bearer token authentication with error handling
- 📱 **Cross-platform** - Works seamlessly in Node.js and modern browsers
- 💾 **Intelligent Caching** - Smart caching with configurable TTL to optimize API quotas
- 🔄 **Real-time Polling** - Auto-polling with managed intervals and error recovery
- 💱 **Offline Conversion** - Convert currencies using cached rates without API calls
- 🌍 **Multi-Language Support** - Currency names and error messages in English, Kurdish, and Arabic
- ⚡ **Performance Optimized** - Minimal bundle size with tree-shaking support
- 🛡️ **Error Resilience** - Comprehensive error handling with detailed error codes

## Installation

```bash
npm install worx-currency-sdk
```

```bash
yarn add worx-currency-sdk
```

```bash
pnpm add worx-currency-sdk
```

## Quick Start

```typescript
import WorxClient from 'worx-currency-sdk';

// Initialize the client
const client = new WorxClient({
  apiToken: 'your-api-token-here'
});

// Get all available exchange rates
const rates = await client.getRates();
console.log(rates);

// Get specific currency with history
const eurData = await client.getCurrency('EUR');
console.log(eurData.currency.price, eurData.currency.trend);

// Add currency to watch list
await client.addWatchedCurrency('GBP');

// Get watched currencies
const watched = await client.getWatchedCurrencies();
console.log(watched);
```

## Supported Currencies

- **USD** - US Dollar
- **EUR** - Euro
- **GBP** - British Pound
- **TRY** - Turkish Lira
- **IRR** - Iranian Rial
- **NOK** - Norwegian Krone
- **SEK** - Swedish Krona
- **JOD** - Jordanian Dinar
- **SAR** - Saudi Riyal
- **AED** - UAE Dirham
- **CAD** - Canadian Dollar
- **AUD** - Australian Dollar
- **CHF** - Swiss Franc
- **DKK** - Danish Krone
- **QAR** - Qatari Riyal
- **KWD** - Kuwaiti Dinar
- **IQD** - Iraqi Dinar

## API Reference

### Client Configuration

```typescript
const client = new WorxClient({
  apiToken: 'your-token',        // Required: Your API token
  baseUrl: 'https://exchnage.dilshad.net, // Optional: Custom API base URL
  timeout: 30000,                // Optional: Request timeout in ms (default: 30000)
  retries: 3,                    // Optional: Number of retries (default: 3)
  retryDelay: 1000              // Optional: Delay between retries in ms (default: 1000)
});
```

### Methods

#### `getRates(options?: RequestOptions)`

Get all exchange rates based on user's watching preferences.

```typescript
const rates = await client.getRates();

// Response structure
interface RatesResponse {
  rates: Array<{
    currency: string;
    name: string;
    flag: string;
    price: number;
    sell: number;
    purchase: number;
    usd: number;
    lastUpdated: string;
    isWatched: boolean;
    watchedAt?: string;
    watchId?: string;
  }>;
  pagination: {
    total: number;
    count: number;
  };
  filters: {
    isWatchingMode: boolean;
    watchedCount: number;
    description: string;
  };
}
```

#### `getCurrency(currency: SupportedCurrency, options?: RequestOptions)`

Get detailed information for a specific currency including history and analytics.

```typescript
const eurData = await client.getCurrency('EUR');

// Response includes:
// - currency: Detailed currency info with price, trend, changes
// - history: Array of historical price points
// - analytics: High, low, average prices and data point count
```

#### `getWatchedCurrencies(options?: RequestOptions)`

Get user's watched currencies with their current rates.

```typescript
const watched = await client.getWatchedCurrencies();

// Response includes:
// - watchedCurrencies: Array of watched currency objects
// - summary: Total count, max allowed, remaining slots
// - filters: Statistics about rate data availability
```

#### `addWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions)`

Add a currency to your watch list.

```typescript
const result = await client.addWatchedCurrency('GBP');

// Response includes:
// - watchedCurrency: The newly watched currency object
// - summary: Updated watch list statistics
// - message: Success message
```

#### `removeWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions)`

Remove a currency from your watch list.

```typescript
const result = await client.removeWatchedCurrency('GBP');

// Response includes:
// - removed: Information about the removed currency
// - summary: Updated watch list statistics  
// - message: Success message
```

#### `getCurrencies(options?: RequestOptions)`

Get all available currencies with metadata and availability status.

```typescript
const currencies = await client.getCurrencies();

// Response includes:
// - currencies: Object with watched, available, and unavailable arrays
// - summary: Overall statistics
// - metadata: Base currency, supported currencies, last updated time
```

#### `getAccountInfo(options?: RequestOptions)`

Get account information including rate limits and subscription details.

```typescript
const account = await client.getAccountInfo();

// Response includes:
// - user: User identifier
// - remainingRequests: Daily API requests remaining  
// - rateLimitRemaining: Per-minute requests remaining
// - timestamp: Current timestamp
```

#### `isCurrencySupported(currency: string)`

Check if a currency code is supported by the API.

```typescript
const isSupported = await client.isCurrencySupported('EUR'); // true
const isNotSupported = await client.isCurrencySupported('XYZ'); // false
```

## Utilities

The SDK includes helpful utility functions:

```typescript
import { 
  validateCurrencyCode, 
  formatCurrency, 
  calculatePercentageChange,
  getCurrencySymbol,
  getSupportedCurrencies,
  roundCurrencyValue
} from 'worx-currency-sdk';

// Validate currency codes
const isValid = validateCurrencyCode('EUR'); // true

// Format currency values with proper symbols
const formatted = formatCurrency(1234.5678, 'USD'); // $1234.5678
const formatted2 = formatCurrency(1500, 'IQD'); // 1500.0000 ع.د

// Calculate percentage changes
const change = calculatePercentageChange(105, 100); // 5

// Get currency symbols
const symbol = getCurrencySymbol('EUR'); // €
const symbolArabic = getCurrencySymbol('SAR'); // ﷼

// Get all supported currencies
const currencies = getSupportedCurrencies(); // ['USD', 'EUR', 'GBP', ...]

// Round values with currency-specific precision
const rounded = roundCurrencyValue(1234.56789, 'USD'); // 1234.5679 (4 decimals)
const roundedIQD = roundCurrencyValue(1234.56789, 'IQD'); // 1235 (no decimals)
```

## Error Handling

The SDK provides detailed error information:

```typescript
import { WorxError } from 'worx-currency-sdk';

try {
  const rates = await client.getRates();
} catch (error) {
  if (error instanceof WorxError) {
    console.log('Error code:', error.code);
    console.log('Status code:', error.statusCode);
    console.log('Message:', error.message);
    console.log('Details:', error.details);
    
    // Rate limiting info
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.log('Retry after:', error.retryAfter, 'seconds');
      console.log('Remaining:', error.rateLimitRemaining);
    }
  }
}
```

## Error Codes

- `UNAUTHORIZED` - Invalid API token
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded, check retryAfter
- `SUBSCRIPTION_LIMIT_EXCEEDED` - Daily subscription limit reached
- `VALIDATION_ERROR` - Invalid input parameters
- `CURRENCY_NOT_FOUND` - Currency not available
- `WATCH_LIMIT_EXCEEDED` - Maximum watched currencies reached
- `WATCH_NOT_FOUND` - Watched currency not found
- `ACCESS_DENIED` - Access to currency denied (not in watch list)
- `TIMEOUT_ERROR` - Request timeout
- `NETWORK_ERROR` - Network connectivity issue
- `INTERNAL_SERVER_ERROR` - Server error

## Rate Limiting

The SDK automatically handles rate limits based on your subscription plan:

- **Free Plan**: 24 API calls per day (1 request per hour)
- **Pro Plan**: 1,500 API calls per day (approximately 62 per hour)
- **Business Plan**: 4,000 API calls per day (approximately 166 per hour)
- **Platinum Plan**: 8,640 API calls per day (6 per minute, 360 per hour)

Rate limit information is available in response headers and error details. The SDK will automatically retry requests when rate limits are exceeded with appropriate backoff strategies.

## Subscription Plans

### Free Plan - $0/month
- **API Calls**: 24 per day (1 per hour)
- **Webhooks**: Not available
- **Support**: Email support
- **Perfect for**: Testing and small personal projects

### Pro Plan - $4.95/month
- **API Calls**: 1,500 per day
- **Webhooks**: Not available
- **Support**: Email support
- **Perfect for**: Small to medium projects

### Business Plan - $9.95/month
- **API Calls**: 4,000 per day
- **Webhooks**: 1 webhook endpoint
- **Support**: Email and chat support
- **Perfect for**: Growing businesses and production apps

### Platinum Plan - $24.95/month
- **API Calls**: 8,640 per day (6 per minute)
- **Webhooks**: 5 webhook endpoints
- **Support**: 24/7 email, chat, and phone support
- **Perfect for**: Enterprise applications and high-volume services

### Custom Plan - Contact for pricing
- **API Calls**: Customized based on your needs
- **Webhooks**: Customized based on your needs
- **Support**: Phone, email, and chat support
- **Custom Pricing**: Tailored to your requirements
- **Perfect for**: Organizations with specific needs

## Advanced Usage

### Smart Caching Configuration

```typescript
// Configure caching settings
const client = new WorxClient({
  apiToken: 'your-token',
  cache: {
    enabled: true,
    ttl: 300000  // 5 minutes cache TTL
  }
});

// Clear cache when needed
client.clearCache();

// Check cached data availability
const rates = await client.getRates(); // Uses cache if available
```

### Real-time Polling

```typescript
// Start polling for rate updates
client.startPolling({
  interval: 60000,  // Poll every minute
  currencies: ['EUR', 'GBP', 'TRY'], // Optional: specific currencies
  onUpdate: (rates) => {
    console.log('New rates received:', rates);
  },
  onError: (error) => {
    console.error('Polling error:', error.message);
  }
});

// Stop polling
client.stopPolling();

// Check polling status
const isPolling = client.isPolling();
```

### Offline Currency Conversion

```typescript
// Convert currencies using cached rates (no API call)
const convertedAmount = client.convert(100, 'USD', 'EUR');
if (convertedAmount !== null) {
  console.log(`100 USD = ${convertedAmount} EUR`);
} else {
  console.log('Conversion not available - rates not cached');
}
```

### Multi-Language Currency Names

```typescript
// Get currency names in different languages
const eurName = client.getCurrencyName('EUR', 'en'); // "Euro"
const eurNameKu = client.getCurrencyName('EUR', 'ku'); // "یۆرۆ"
const eurNameAr = client.getCurrencyName('EUR', 'ar'); // "اليورو"

// Use in your application
const displayName = client.getCurrencyName('IQD', 'ku'); // "دیناری عێراقی"
```

### Custom Request Options

```typescript
// Custom timeout and retry settings
const rates = await client.getRates({
  timeout: 10000,    // 10 second timeout
  retries: 1,        // Only 1 retry
  retryDelay: 500    // 500ms delay between retries
});
```

### Working with Historical Data

```typescript
const eurData = await client.getCurrency('EUR');

// Access historical prices
eurData.history.forEach(point => {
  console.log(`${point.timestamp}: ${point.price}`);
});

// Use analytics
console.log('Highest price:', eurData.analytics.highestPrice);
console.log('Lowest price:', eurData.analytics.lowestPrice);
console.log('Average price:', eurData.analytics.averagePrice);
```

### Monitoring Currency Changes

```typescript
// Add currencies to watch list
await client.addWatchedCurrency('EUR');
await client.addWatchedCurrency('GBP');
await client.addWatchedCurrency('TRY');

// Get current rates for watched currencies only
const watchedRates = await client.getRates();
console.log('Watching mode:', watchedRates.filters.isWatchingMode); // true

// Monitor specific currency trends
const eur = await client.getCurrency('EUR');
console.log(`EUR trend: ${eur.currency.trend}`); // 'up', 'down', or 'stable'
console.log(`Price change: ${eur.currency.changePercent}%`);
```

## TypeScript Support

The SDK is written in TypeScript and provides complete type definitions:

```typescript
import { 
  WorxClient, 
  RatesResponse, 
  CurrencyResponse,
  SupportedCurrency,
  WorxError 
} from 'worx-currency-sdk';

// All responses are fully typed
const client = new WorxClient({ apiToken: 'token' });
const rates: RatesResponse = await client.getRates();
const currency: CurrencyResponse = await client.getCurrency('EUR');
```

## Browser Support

The SDK works in modern browsers with fetch support. For older browsers, include a fetch polyfill:

```typescript
// For older browsers
import WorxClient from 'worx-currency-sdk';

const client = new WorxClient({ apiToken: 'your-token' });
```

## Performance Tips

### Optimize API Usage for Free Plans
```typescript
// Use caching effectively to minimize API calls
const client = new WorxClient({
  apiToken: 'your-free-plan-token',
  // ttl is in milliseconds
  cache: { enabled: true, ttl: 3600000 } // 60 minutes (3600000 ms) for free plans
});

// Batch operations when possible
const [rates, account] = await Promise.all([
  client.getRates(),
  client.getAccountInfo()
]);
```

### Real-time Applications
```typescript
// Use polling for live dashboards
client.startPolling({
  interval: 120000, // 2 minutes for free plans
  currencies: ['USD', 'EUR', 'GBP'], // Monitor specific currencies
  onUpdate: (rates) => updateUI(rates)
});

// Implement offline-first approach
const convertedAmount = client.convert(amount, 'USD', 'EUR');
if (convertedAmount === null) {
  // Fallback to API call if cache miss
  const eurData = await client.getCurrency('EUR');
  // Use fresh rate for conversion
}
```

## Best Practices

1. **Cache Management**: Enable caching to optimize quota usage, especially on Free plans
2. **Error Handling**: Always handle `WorxError` for proper user experience
3. **Rate Limiting**: Monitor `rateLimitRemaining` in responses to avoid hitting limits
4. **Offline Support**: Use `convert()` method for offline currency calculations
5. **Multi-language**: Use `getCurrencyName()` for localized currency displays
6. **Resource Cleanup**: Call `client.destroy()` when done to clean up polling intervals


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: worx@dilshad.net
