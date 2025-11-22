# WORX SDK ی گۆڕینی دراو

SDK ی تایبەتمەند بە TypeScript بۆ WORX v1 API ی گۆڕینی دراو. نرخی گۆڕینی دراوەکان بە کاتی ڕاستەقینە بەدەست بهێنە لەگەڵ تایبەتمەندییە گشتگیرەکان وەک کاشکردنی زیرەک، گۆڕین لە دەرەوەی هێڵ، و پشتگیری فرە زمان.

[![npm version](https://badge.fury.io/js/worx-currency-sdk.svg)](https://www.npmjs.com/package/worx-currency-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🌍 پشتگیری فرە زمان**: [English](https://github.com/Dilshad4/WORX-Currency-Exchange-SDK/blob/main/README.md) | [العربية](https://github.com/Dilshad4/WORX-Currency-Exchange-SDK/blob/main/README-ar.md)

## تایبەتمەندییەکان

- 🚀 **پشتگیری تەواوی TypeScript** - پێناسەی جۆری تەواو و IntelliSense
- 💰 **نرخی گۆڕینی کاتی ڕاستەقینە** - زیاتر لە ١٧ دراوی پشتگیریکراو لەنێوان IQD، USD، EUR، GBP
- 👀 **لیستی چاودێریکردنی دراو** - چاودێری دراوە تایبەتەکان بە شوێنکەوتنی کەسی
- 📊 **داتا و شیکاریی مێژووی** - ڕەوتی نرخ، گۆڕانکاری، و شیکاریی گشتگیر
- 🔄 **دووبارە هەوڵدانەوەی خودکار** - بیرکاری دووبارە هەوڵدانەوە لەگەڵ backoff exponential
- 🚦 **سنوردانانی نرخی زیرەک** - بەڕێوەبردنی سنووری نرخی خودکار لەگەڵ ئاگاداریی اشتراک
- 🎯 **بەڕێوەبردنی اشتراک** - پشتگیری پلانەکانی خۆڕایی، پرۆ، بازرگانی، پلاتینیوم، و تایبەت
- 🔐 **پشتسازیی دڵنیا** - پشتسازیی Bearer token لەگەڵ مامەڵەکردن لەگەڵ هەڵە
- 📱 **پلاتفۆرمی کراوە** - کارکردن بە باشی لە Node.js و وێبگەڕە نوێیەکان
- 💾 **کاشکردنی زیرەک** - کاشکردنی زیرەک لەگەڵ TTL ڕێکخستنکراو بۆ باشکردنی کۆتای API
- 🔄 **پۆڵینگی کاتی ڕاستەقینە** - پۆڵینگی خودکار لەگەڵ ماوە بەڕێوەبراوەکان و چاکبوونەوەی هەڵە
- 💱 **گۆڕینی دەرەوەی هێڵ** - گۆڕینی دراوەکان بە بەکارهێنانی نرخە کاشکراوەکان بەبێ بانگکردنی API
- 🌍 **پشتگیری فرە زمان** - ناوی دراوەکان و پەیامی هەڵەکان بە ئینگلیزی، کوردی، و عەرەبی
- ⚡ **باشکراوی کارایی** - قەبارەی کەمی bundle لەگەڵ پشتگیری tree-shaking
- 🛡️ **بەرگەگرتن لە هەڵە** - مامەڵەکردنی گشتگیر لەگەڵ هەڵە لەگەڵ کۆدی هەڵەی ورد

## دامەزراندن

```bash
npm install worx-currency-sdk
```

```bash
yarn add worx-currency-sdk
```

```bash
pnpm add worx-currency-sdk
```

## دەستپێکردنی خێرا

```typescript
import WorxClient from 'worx-currency-sdk';

// دەستپێکردنی کڕیار
const client = new WorxClient({
  apiToken: 'your-api-token-here'
});

// بەدەستهێنانی هەموو نرخە بەردەستەکانی گۆڕین
const rates = await client.getRates();
console.log(rates);

// بەدەستهێنانی دراوی تایبەت لەگەڵ مێژوو
const eurData = await client.getCurrency('EUR');
console.log(eurData.currency.price, eurData.currency.trend);

// زیادکردنی دراو بۆ لیستی چاودێری
await client.addWatchedCurrency('GBP');

// بەدەستهێنانی دراوە چاودێریکراوەکان
const watched = await client.getWatchedCurrencies();
console.log(watched);
```

## دراوە پشتگیریکراوەکان

- **USD** - دۆلاری ئەمریکی
- **EUR** - یۆرۆ
- **GBP** - پاوەندی بریتانی
- **TRY** - لیرەی تورکی
- **IRR** - ڕیالی ئێرانی
- **NOK** - کرۆنی نۆرویژی
- **SEK** - کرۆنای سویدی
- **JOD** - دیناری ئوردونی
- **SAR** - ڕیالی سعودی
- **AED** - درهەمی ئیمارات
- **CAD** - دۆلاری کەنەدی
- **AUD** - دۆلاری ئۆسترالی
- **CHF** - فرانکی سویسری
- **DKK** - کرۆنی دانماركی
- **QAR** - ڕیالی قەتەری
- **KWD** - دیناری کوەیتی
- **IQD** - دیناری عێراقی

## ئاماژەی API

### ڕێکخستنی کڕیار

```typescript
const client = new WorxClient({
  apiToken: 'your-token',        // پێویست: تۆکینی API ت
  timeout: 30000,                // هەڵبژاردە: کاتی چاوەڕوان بە ms (بنەڕەت: 30000)
  retries: 3,                    // هەڵبژاردە: ژمارەی دووبارە هەوڵدانەوە (بنەڕەت: 3)
  retryDelay: 1000              // هەڵبژاردە: دواکەوتن لە نێوان دووبارە هەوڵدانەوەکان بە ms (بنەڕەت: 1000)
});
```

### شێوازەکان

#### `getRates(options?: RequestOptions)`

بەدەستهێنانی هەموو نرخە گۆڕینەکان بە پشتبەستن بە هەڵبژاردەی چاودێریکردنی بەکارهێنەر.

```typescript
const rates = await client.getRates();

// پێکهاتەی وەڵام
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

بەدەستهێنانی زانیاریی ورد بۆ دراوێکی تایبەت لەگەڵ مێژوو و شیکاری.

```typescript
const eurData = await client.getCurrency('EUR');

// وەڵام بریتیە لە:
// - currency: زانیاریی ورد لەسەر دراو لەگەڵ نرخ، ڕەوت، گۆڕانکاری
// - history: ئەرەی خاڵەکانی نرخی مێژووی
// - analytics: نرخی بەرز، نزم، ناوەند و ژمارەی خاڵەی داتا
```

#### `getWatchedCurrencies(options?: RequestOptions)`

بەدەستهێنانی دراوە چاودێریکراوەکانی بەکارهێنەر لەگەڵ نرخە ئێستاکەیان.

```typescript
const watched = await client.getWatchedCurrencies();

// وەڵام بریتیە لە:
// - watchedCurrencies: ئەرەی ئۆبجێکتەکانی دراوی چاودێریکراو
// - summary: کۆی گشتی، زۆرترین ڕێگەپێدراو، شوێنە ماوەکان
// - filters: ئامارەکان لەسەر بەردەستبوونی داتای نرخ
```

#### `addWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions)`

زیادکردنی دراوێک بۆ لیستی چاودێریت.

```typescript
const result = await client.addWatchedCurrency('GBP');

// وەڵام بریتیە لە:
// - watchedCurrency: ئۆبجێکتی دراوی تازە چاودێریکراو
// - summary: ئامارە نوێکراوەکانی لیستی چاودێری
// - message: پەیامی سەرکەوتن
```

#### `removeWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions)`

لابردنی دراوێک لە لیستی چاودێریت.

```typescript
const result = await client.removeWatchedCurrency('GBP');

// وەڵام بریتیە لە:
// - removed: زانیاری لەسەر دراوی لابراو
// - summary: ئامارە نوێکراوەکانی لیستی چاودێری
// - message: پەیامی سەرکەوتن
```

#### `getCurrencies(options?: RequestOptions)`

بەدەستهێنانی هەموو دراوە بەردەستەکان لەگەڵ میتاداتا و دۆخی بەردەستبوون.

```typescript
const currencies = await client.getCurrencies();

// وەڵام بریتیە لە:
// - currencies: ئۆبجێکت لەگەڵ ئەرەکانی چاودێریکراو، بەردەست، و ناوبەردەست
// - summary: ئاماری گشتی
// - metadata: دراوی بنەڕەت، دراوە پشتگیریکراوەکان، کاتی دوایین نوێکردنەوە
```

#### `getAccountInfo(options?: RequestOptions)`

بەدەستهێنانی زانیاریی هەژمار لەگەڵ سنووری نرخ و وردەکاریی اشتراک.

```typescript
const account = await client.getAccountInfo();

// وەڵام بریتیە لە:
// - user: ناسێنەری بەکارهێنەر
// - remainingRequests: داواکاریی API ی ماوەی ڕۆژانە
// - rateLimitRemaining: داواکاریی ماوەی هەر خولەکێک
// - timestamp: کاتەوە ئێستا
```

#### `isCurrencySupported(currency: string)`

پشکنینی ئەوەی ئایا کۆدێکی دراو پشتگیری دەکرێت لەلایەن API.

```typescript
const isSupported = await client.isCurrencySupported('EUR'); // true
const isNotSupported = await client.isCurrencySupported('XYZ'); // false
```

## ئامرازەکان

SDK تەوەرەکانی پێویست دەگرێتەوە:

```typescript
import { 
  validateCurrencyCode, 
  formatCurrency, 
  calculatePercentageChange,
  getCurrencySymbol,
  getSupportedCurrencies,
  roundCurrencyValue
} from 'worx-currency-sdk';

// پشتڕاستکردنەوەی کۆدی دراو
const isValid = validateCurrencyCode('EUR'); // true

// فۆرماتکردنی بەهای دراو لەگەڵ سیمبۆلی گونجاو
const formatted = formatCurrency(1234.5678, 'USD'); // $1234.5678
const formatted2 = formatCurrency(1500, 'IQD'); // 1500.0000 ع.د

// حیسابکردنی گۆڕانکاریی ڕێژەیی
const change = calculatePercentageChange(105, 100); // 5

// بەدەستهێنانی سیمبۆلی دراو
const symbol = getCurrencySymbol('EUR'); // €
const symbolArabic = getCurrencySymbol('SAR'); // ﷼

// بەدەستهێنانی هەموو دراوە پشتگیریکراوەکان
const currencies = getSupportedCurrencies(); // ['USD', 'EUR', 'GBP', ...]

// خۆڕاکردنی بەهاکان لەگەڵ وردبینی تایبەت بە دراو
const rounded = roundCurrencyValue(1234.56789, 'USD'); // 1234.5679 (4 دەهی)
const roundedIQD = roundCurrencyValue(1234.56789, 'IQD'); // 1235 (بێ دەهی)
```

## مامەڵەکردن لەگەڵ هەڵە

SDK زانیاریی ورد لەسەر هەڵە دابین دەکات:

```typescript
import { WorxError } from 'worx-currency-sdk';

try {
  const rates = await client.getRates();
} catch (error) {
  if (error instanceof WorxError) {
    console.log('کۆدی هەڵە:', error.code);
    console.log('کۆدی دۆخ:', error.statusCode);
    console.log('پەیام:', error.message);
    console.log('وردەکاری:', error.details);
    
    // زانیاریی سنوردانانی نرخ
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.log('دووبارە هەوڵ بدەوە دوای:', error.retryAfter, 'چرکە');
      console.log('ماوە:', error.rateLimitRemaining);
    }
  }
}
```

## کۆدی هەڵە

- `UNAUTHORIZED` - تۆکینی API نادروست
- `RATE_LIMIT_EXCEEDED` - سنووری نرخ تێپەڕێنراوە، retryAfter بپشکنە
- `SUBSCRIPTION_LIMIT_EXCEEDED` - سنووری ڕۆژانەی اشتراک گەیشتە
- `VALIDATION_ERROR` - پارامیتەری هاتووی نادروست
- `CURRENCY_NOT_FOUND` - دراو بەردەست نییە
- `WATCH_LIMIT_EXCEEDED` - زۆرترین دراوی چاودێریکراو گەیشتە
- `WATCH_NOT_FOUND` - دراوی چاودێریکراو نەدۆزرایەوە
- `ACCESS_DENIED` - دەستڕاگەیشتن بۆ دراو ڕەتکرایەوە (لە لیستی چاودێری نییە)
- `TIMEOUT_ERROR` - کاتی چاوەڕوانی داواکاری
- `NETWORK_ERROR` - کێشەی بەستەری تۆڕ
- `INTERNAL_SERVER_ERROR` - هەڵەی ڕاژەکار

## سنوردانانی نرخ

SDK بە شێوەی خودکار سنووری نرخەکان بەڕێوە دەبات بە پشتبەستن بە پلانی اشتراکت:

- **پلانی خۆڕایی**: ٢٤ بانگکردنی API لە ڕۆژێکدا (١ داواکاری لە کاتژمێرێک)
- **پلانی پرۆ**: ١٥٠٠ بانگکردنی API لە ڕۆژێکدا (نزیکەی ٦٢ لە کاتژمێرێک)
- **پلانی بازرگانی**: ٤٠٠٠ بانگکردنی API لە ڕۆژێکدا (نزیکەی ١٦٦ لە کاتژمێرێک)
- **پلانی پلاتینیوم**: ٨٦٤٠ بانگکردنی API لە ڕۆژێکدا (٦ لە خولەکێک، ٣٦٠ لە کاتژمێرێک)

زانیاریی سنووری نرخ لە سەرنووسەی وەڵام و وردەکاری هەڵەدا بەردەستە. SDK بە شێوەی خودکار دووبارە هەوڵی داواکاریەکان دەدات کاتێک سنووری نرخ تێپەڕێنراوە لەگەڵ ستراتیژیی گونجاوی backoff.

## پلانەکانی اشتراک

### پلانی خۆڕایی - $٠/مانگ
- **بانگکردنی API**: ٢٤ لە ڕۆژێک (١ لە کاتژمێرێک)
- **Webhooks**: بەردەست نییە
- **پشتگیری**: پشتگیری ئیمەیڵ
- **تەواو بۆ**: تاقیکردنەوە و پڕۆژە بچووکە کەسییەکان

### پلانی پرۆ - $٤.٩٥/مانگ
- **بانگکردنی API**: ١٥٠٠ لە ڕۆژێک
- **Webhooks**: بەردەست نییە
- **پشتگیری**: پشتگیری ئیمەیڵ
- **تەواو بۆ**: پڕۆژە بچووک بۆ مامناوەندەکان

### پلانی بازرگانی - $٩.٩٥/مانگ
- **بانگکردنی API**: ٤٠٠٠ لە ڕۆژێک
- **Webhooks**: ١ خاڵی کۆتایی webhook
- **پشتگیری**: پشتگیری ئیمەیڵ و گفتوگۆ
- **تەواو بۆ**: بازرگانی گەشەکردوو و ئەپی بەرهەمهێنان

### پلانی پلاتینیوم - $٢٤.٩٥/مانگ
- **بانگکردنی API**: ٨٦٤٠ لە ڕۆژێک (٦ لە خولەکێک)
- **Webhooks**: ٥ خاڵی کۆتایی webhook
- **پشتگیری**: پشتگیری ٢٤/٧ ئیمەیڵ، گفتوگۆ، و تەلەفۆن
- **تەواو بۆ**: ئەپلیکەیشنی کۆمپانیا و خزمەتگوزاریی قەبارە گەورە

### پلانی تایبەت - پەیوەندی بکە بۆ نرخدان
- **بانگکردنی API**: گونجاو بە پێویستییەکانت
- **Webhooks**: گونجاو بە پێویستییەکانت
- **پشتگیری**: پشتگیری تەلەفۆن، ئیمەیڵ، و گفتوگۆ
- **نرخدانی تایبەت**: گونجاو بە پێداویستییەکانت
- **تەواو بۆ**: دامەزراوەکان لەگەڵ پێویستی تایبەت

## بەکارهێنانی پێشکەوتوو

### ڕێکخستنی کاشکردنی زیرەک

```typescript
// ڕێکخستنی ڕێکخستنەکانی کاش
const client = new WorxClient({
  apiToken: 'your-token',
  cache: {
    enabled: true,
    ttl: 300000  // ٥ خولەک TTL کاش
  }
});

// پاکردنەوەی کاش کاتێک پێویستە
client.clearCache();

// پشکنینی بەردەستبوونی داتای کاشکراو
const rates = await client.getRates(); // کاش بەکار دەهێنێت ئەگەر بەردەست بێت
```

### پۆڵینگی کاتی ڕاستەقینە

```typescript
// دەستپێکردنی پۆڵینگ بۆ نوێکردنەوەی نرخ
client.startPolling({
  interval: 60000,  // پۆڵ هەر خولەکێک
  currencies: ['EUR', 'GBP', 'TRY'], // هەڵبژاردە: دراوە تایبەتەکان
  onUpdate: (rates) => {
    console.log('نرخی نوێ وەرگیرا:', rates);
  },
  onError: (error) => {
    console.error('هەڵەی پۆڵینگ:', error.message);
  }
});

// وەستاندنی پۆڵینگ
client.stopPolling();

// پشکنینی دۆخی پۆڵینگ
const isPolling = client.isPolling();
```

### گۆڕینی دراوی دەرەوەی هێڵ

```typescript
// گۆڕینی دراوەکان بە بەکارهێنانی نرخی کاشکراو (بانگکردنی API نییە)
const convertedAmount = client.convert(100, 'USD', 'EUR');
if (convertedAmount !== null) {
  console.log(`100 USD = ${convertedAmount} EUR`);
} else {
  console.log('گۆڕین بەردەست نییە - نرخەکان کاش نەکراون');
}
```

### ناوی دراوی فرە زمان

```typescript
// بەدەستهێنانی ناوی دراو بە زمانە جیاوازەکان
const eurName = client.getCurrencyName('EUR', 'en'); // "Euro"
const eurNameKu = client.getCurrencyName('EUR', 'ku'); // "یۆرۆ"
const eurNameAr = client.getCurrencyName('EUR', 'ar'); // "اليورو"

// بەکارهێنان لە ئەپلیکەیشنت
const displayName = client.getCurrencyName('IQD', 'ku'); // "دیناری عێراقی"
```

### هەڵبژاردەی داواکاریی تایبەت

```typescript
// ڕێکخستنی کاتی چاوەڕوان و دووبارە هەوڵدانەوەی تایبەت
const rates = await client.getRates({
  timeout: 10000,    // کاتی چاوەڕوانی ١٠ چرکە
  retries: 1,        // تەنها ١ دووبارە هەوڵدانەوە
  retryDelay: 500    // دواکەوتنی ٥٠٠ms لە نێوان دووبارە هەوڵدانەوەکان
});
```

### کارکردن لەگەڵ داتای مێژووی

```typescript
const eurData = await client.getCurrency('EUR');

// دەستڕاگەیشتن بە نرخی مێژووی
eurData.history.forEach(point => {
  console.log(`${point.timestamp}: ${point.price}`);
});

// بەکارهێنانی شیکاری
console.log('بەرزترین نرخ:', eurData.analytics.highestPrice);
console.log('نزمترین نرخ:', eurData.analytics.lowestPrice);
console.log('ناوەندی نرخ:', eurData.analytics.averagePrice);
```

### چاودێریکردنی گۆڕانکاریی دراو

```typescript
// زیادکردنی دراوەکان بۆ لیستی چاودێری
await client.addWatchedCurrency('EUR');
await client.addWatchedCurrency('GBP');
await client.addWatchedCurrency('TRY');

// بەدەستهێنانی نرخی ئێستا بۆ دراوە چاودێریکراوەکان تەنها
const watchedRates = await client.getRates();
console.log('مۆدی چاودێری:', watchedRates.filters.isWatchingMode); // true

// چاودێریکردنی ڕەوتی دراوی تایبەت
const eur = await client.getCurrency('EUR');
console.log(`ڕەوتی EUR: ${eur.currency.trend}`); // 'up'، 'down'، یان 'stable'
console.log(`گۆڕانی نرخ: ${eur.currency.changePercent}%`);
```

## پشتگیری TypeScript

SDK بە TypeScript نووسراوە و پێناسەی جۆری تەواو دابین دەکات:

```typescript
import { 
  WorxClient, 
  RatesResponse, 
  CurrencyResponse,
  SupportedCurrency,
  WorxError 
} from 'worx-currency-sdk';

// هەموو وەڵامەکان بە تەواوی جۆردار کراون
const client = new WorxClient({ apiToken: 'token' });
const rates: RatesResponse = await client.getRates();
const currency: CurrencyResponse = await client.getCurrency('EUR');
```

## پشتگیری وێبگەڕ

SDK لە وێبگەڕە نوێیەکان کار دەکات لەگەڵ پشتگیری fetch. بۆ وێبگەڕە کۆنەکان، polyfill ی fetch بخەرە ژوورەوە:

```typescript
// بۆ وێبگەڕە کۆنەکان
import WorxClient from 'worx-currency-sdk';

const client = new WorxClient({ apiToken: 'your-token' });
```

## ئامۆژگاریی کارایی

### باشکردنی بەکارهێنانی API بۆ پلانە خۆڕاییەکان
```typescript
// بە کاریگەری کاش بەکار بهێنە بۆ کەمکردنەوەی بانگکردنی API
const client = new WorxClient({
  apiToken: 'your-free-plan-token',
  // ttl بە میلی چرکە
  cache: { enabled: true, ttl: 3600000 } // ٦٠ خولەک (٣٦٠٠٠٠٠ ms) بۆ پلانە خۆڕاییەکان
});

// کاری کۆمەڵایەتی کاتێک دەکرێت
const [rates, account] = await Promise.all([
  client.getRates(),
  client.getAccountInfo()
]);
```

### ئەپلیکەیشنی کاتی ڕاستەقینە
```typescript
// پۆڵینگ بەکار بهێنە بۆ داشبۆردی زیندوو
client.startPolling({
  interval: 120000, // ٢ خولەک بۆ پلانە خۆڕاییەکان
  currencies: ['USD', 'EUR', 'GBP'], // چاودێریکردنی دراوە تایبەتەکان
  onUpdate: (rates) => updateUI(rates)
});

// جێبەجێکردنی ڕێبازی offline-first
const convertedAmount = client.convert(amount, 'USD', 'EUR');
if (convertedAmount === null) {
  // پاشەکشە بۆ بانگکردنی API ئەگەر کاش نەدۆزرایەوە
  const eurData = await client.getCurrency('EUR');
  // نرخی تازە بۆ گۆڕین بەکار بهێنە
}
```

## باشترین پراکتیسەکان

١. **بەڕێوەبردنی کاش**: کاشکردن چالاک بکە بۆ باشکردنی بەکارهێنانی کۆتا، بە تایبەتی لەسەر پلانە خۆڕاییەکان
٢. **مامەڵەکردن لەگەڵ هەڵە**: هەمیشە `WorxError` مامەڵە بکە بۆ ئەزموونی گونجاوی بەکارهێنەر
٣. **سنوردانانی نرخ**: `rateLimitRemaining` لە وەڵامەکان بپشکنە بۆ دوورکەوتنەوە لە گەیشتن بە سنوورەکان
٤. **پشتگیری دەرەوەی هێڵ**: شێوازی `convert()` بۆ حیسابی دراوی دەرەوەی هێڵ بەکار بهێنە
٥. **فرە زمان**: `getCurrencyName()` بۆ پیشاندانی دراوی خۆماڵی بەکار بهێنە
٦. **پاکردنەوەی سەرچاوە**: `client.destroy()` بانگ بکە کاتێک تەواو بوویت بۆ پاکردنەوەی ماوەی پۆڵینگ

## مۆڵەت

ئەم پڕۆژەیە بە مۆڵەتی MIT مۆڵەت دراوە - فایلی [LICENSE](LICENSE) ببینە بۆ وردەکاری.

## پشتگیری

- 📧 ئیمەیڵ: worx@dilshad.net