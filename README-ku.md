# WORX دراوی نەوەی SDK

TypeScript-ی پیشەیی SDK بۆ WORX v1 دراوی نەوەی API. نرخی نەوەی دراوەکان لە کاتی ڕاستەوخۆدا وەربگرە لەگەڵ تایبەتمەندییە تەواوەکان وەک cache-ی زیرەک، نەوەی بێ ئینتەرنێت، و پشتگیری زمانە جیاوازەکان.

[![npm version](https://badge.fury.io/js/exapi-currency-sdk.svg)](https://www.npmjs.com/package/exapi-currency-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🌍 پشتگیری زمانە فرەکان**: [English](./README.md) | [العربية](./README-ar.md)

## تایبەتمەندییەکان

- 🚀 **پشتگیری تەواوی TypeScript** - پێناسەی جۆرە تەواوەکان و IntelliSense
- 💰 **نرخی نەوەی کاتی ڕاستەوخۆ** - زیاتر لە 17 دراو پشتگیری کراوە لەناویاندا دیناری عێراقی، دۆلار، یۆرۆ، پاوەند
- 👀 **لیستی چاودێری دراوەکان** - چاودێری دراوە دیاریکراوەکان لەگەڵ شوێنکەوتنی کەسی
- 📊 **داتای مێژوویی و شیکاری** - ڕەوتی نرخەکان، گۆڕانکارییەکان، و شیکاری تەواو
- 🔄 **دووبارە هەوڵدانەوەی خودکار** - منطقی دووبارە هەوڵدانەوەی دروست لەگەڵ دواخستنی پلەبەپلە
- 🚦 **سنووری نرخی زیرەک** - مامەڵەکردنی خودکار لەگەڵ سنووری نرخەکان لەگەڵ هۆشیاری بەشداریکردن
- 🎯 **بەڕێوەبردنی بەشداریکردن** - پشتگیری پلانی خۆڕایی، پڕۆ، بزنس، پلاتینی، و تایبەت
- 🔐 **ناساندنی پارێزراو** - ناساندنی نیشانەی Bearer لەگەڵ چارەسەرکردنی هەڵە
- 📱 **فرە پلاتفۆرم** - بە نەرمی کار دەکات لە Node.js و وێبگەڕە نوێیەکاندا
- 💾 **cache-ی زیرەک** - cache-ی زیرەک لەگەڵ TTL-ی دیاریکراو بۆ باشکردنی بەکارهێنانی API
- 🔄 **polling-ی کاتی ڕاستەوخۆ** - polling-ی خودکار لەگەڵ ماوە بەڕێوەچووەکان و گەڕانەوەی هەڵەکان
- 💱 **نەوەی بێ ئینتەرنێت** - گۆڕینی دراوەکان بە بەکارهێنانی نرخە cache کراوەکان بێ بانگکردنی API
- 🌍 **پشتگیری فرە زمان** - ناوی دراوەکان و پەیامی هەڵەکان بە ئینگلیزی، کوردی، و عەرەبی
- ⚡ **ئادایی باشکراو** - قەبارەی پاکێجی کەمترین لەگەڵ پشتگیری tree-shaking
- 🛡️ **بەرگەگرتن لە هەڵەکان** - چارەسەرکردنی تەواوی هەڵەکان لەگەڵ کۆدی هەڵەی ورد

## دامەزراندن

```bash
npm install exapi-currency-sdk
```

```bash
yarn add exapi-currency-sdk
```

```bash
pnpm add exapi-currency-sdk
```

## دەستپێکردنی خێرا

```typescript
import WorxClient from 'exapi-currency-sdk';

// دەستپێکردنی client
const client = new WorxClient({
  apiToken: 'your-api-token-here'
});

// وەرگرتنی هەموو نرخی نەوەی بەردەست
const rates = await client.getRates();
console.log(rates);

// وەرگرتنی دراوێکی دیاریکراو لەگەڵ مێژوو
const eurData = await client.getCurrency('EUR');
console.log(eurData.currency.price, eurData.currency.trend);

// زیادکردنی دراو بۆ لیستی چاودێری
await client.addWatchedCurrency('GBP');

// وەرگرتنی دراوە چاودێریکراوەکان
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

## سەرچاوەی API

### ڕێکخستنی client

```typescript
const client = new WorxClient({
  apiToken: 'your-token',        // پێویست: نیشانەی API-ی تۆ
  baseUrl: 'https://api.worx.dev', // ئیختیاری: ناونیشانی بنەڕەتی تایبەت بۆ API
  timeout: 30000,                // ئیختیاری: کاتی چاوەڕوان بە میلی چرکە (بنەڕەت: 30000)
  retries: 3,                    // ئیختیاری: ژمارەی دووبارە هەوڵدانەوەکان (بنەڕەت: 3)
  retryDelay: 1000,              // ئیختیاری: دواخستن لە نێوان هەوڵدانەوەکان بە میلی چرکە (بنەڕەت: 1000)
  cache: {                       // ئیختیاری: ڕێکخستنەکانی cache
    enabled: true,               // چالاککردنی cache
    ttl: 300000                  // 5 خولەک TTL
  }
});
```

### ڕێگا سەرەکییەکان

#### `getRates(options?: RequestOptions)`

وەرگرتنی هەموو نرخی نەوەکان بەپێی ئارەزووی چاودێری بەکارهێنەر.

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

وەرگرتنی زانیاری ورد بۆ دراوێکی دیاریکراو لەگەڵ مێژوو و شیکاری.

```typescript
const eurData = await client.getCurrency('EUR');

// وەڵام لەخۆدەگرێت:
// - currency: زانیاری وردی دراو لەگەڵ نرخ، ڕەوت، گۆڕانکارییەکان
// - history: ڕیزبەندی خاڵە نرخە مێژووییەکان
// - analytics: بەرزترین، نزمترین، ناوەند نرخەکان و ژمارەی خاڵی زانیاری
```

### بەکارهێنانی پێشکەوتوو

#### ڕێکخستنی cache-ی زیرەک

```typescript
// ڕێکخستنی ڕێکخستنەکانی cache
const client = new WorxClient({
  apiToken: 'your-token',
  cache: {
    enabled: true,
    ttl: 300000  // 5 خولەک TTL بۆ cache
  }
});

// پاککردنەوەی cache کاتێک پێویست دەبێت
client.clearCache();

// پشکنینی بەردەستبوونی داتای cache کراو
const rates = await client.getRates(); // cache بەکاردێنێت ئەگەر بەردەست بێت
```

#### polling-ی کاتی ڕاستەوخۆ

```typescript
// دەستپێکردنی polling بۆ نوێکردنەوەی نرخەکان
client.startPolling({
  interval: 60000,  // polling لە هەر خولەکێکدا
  currencies: ['EUR', 'GBP', 'TRY'], // ئیختیاری: دراوە دیاریکراوەکان
  onUpdate: (rates) => {
    console.log('نرخی نوێ وەرگیرا:', rates);
  },
  onError: (error) => {
    console.error('هەڵەی polling:', error.message);
  }
});

// وەستاندنی polling
client.stopPolling();

// پشکنینی دۆخی polling
const isPolling = client.isPolling();
```

#### نەوەی دراوی بێ ئینتەرنێت

```typescript
// گۆڕینی دراوەکان بە بەکارهێنانی نرخە cache کراوەکان (بێ بانگکردنی API)
const convertedAmount = client.convert(100, 'USD', 'EUR');
if (convertedAmount !== null) {
  console.log(`100 USD = ${convertedAmount} EUR`);
} else {
  console.log('نەوە بەردەست نییە - نرخەکان cache نەکراون');
}
```

#### ناوی دراوەکان بە زمانی فرە

```typescript
// وەرگرتنی ناوی دراوەکان بە زمانی جیاواز
const eurName = client.getCurrencyName('EUR', 'en'); // "Euro"
const eurNameKu = client.getCurrencyName('EUR', 'ku'); // "یۆرۆ"
const eurNameAr = client.getCurrencyName('EUR', 'ar'); // "اليورو"

// بەکارهێنان لە نەرمەکاڵاکەتدا
const displayName = client.getCurrencyName('IQD', 'ku'); // "دیناری عێراقی"
```

## ئامرازەکان

SDK ئامرازە یارمەتیدەرە بەسوودەکان لەخۆدەگرێت:

```typescript
import { 
  validateCurrencyCode, 
  formatCurrency, 
  calculatePercentageChange,
  getCurrencySymbol,
  getSupportedCurrencies,
  roundCurrencyValue
} from 'exapi-currency-sdk';

// پشتڕاستکردنەوەی کۆدی دراوەکان
const isValid = validateCurrencyCode('EUR'); // true

// شێوازکردنی نرخی دراوەکان لەگەڵ هێماکانی ڕاست
const formatted = formatCurrency(1234.5678, 'USD'); // $1234.5678
const formatted2 = formatCurrency(1500, 'IQD'); // 1500.0000 ع.د

// حیسابکردنی گۆڕانکاری ڕێژەیی
const change = calculatePercentageChange(105, 100); // 5

// وەرگرتنی هێمای دراوەکان
const symbol = getCurrencySymbol('EUR'); // €
const symbolArabic = getCurrencySymbol('SAR'); // ﷼

// وەرگرتنی هەموو دراوە پشتگیریکراوەکان
const currencies = getSupportedCurrencies(); // ['USD', 'EUR', 'GBP', ...]

// خشتەکردنی نرخەکان لەگەڵ وردی تایبەت بە دراو
const rounded = roundCurrencyValue(1234.56789, 'USD'); // 1234.5679 (4 دەسەتانە)
const roundedIQD = roundCurrencyValue(1234.56789, 'IQD'); // 1235 (بێ دەسەتانە)
```

## چارەسەرکردنی هەڵەکان

SDK زانیاری وردی هەڵەکان دابین دەکات:

```typescript
import { WorxError } from 'exapi-currency-sdk';

try {
  const rates = await client.getRates();
} catch (error) {
  if (error instanceof WorxError) {
    console.log('کۆدی هەڵە:', error.code);
    console.log('کۆدی دۆخ:', error.statusCode);
    console.log('پەیام:', error.message);
    console.log('وردەکارییەکان:', error.details);
    
    // زانیاری سنوورداری نرخ
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      console.log('دووبارە هەوڵدانەوە دوای:', error.retryAfter, 'چرکە');
      console.log('ماوە:', error.rateLimitRemaining);
    }
  }
}
```

## کۆدی هەڵەکان

- `UNAUTHORIZED` - نیشانەی API نادروست
- `RATE_LIMIT_EXCEEDED` - سنووری نرخ تێپەڕێنرا، پشکنینی retryAfter
- `SUBSCRIPTION_LIMIT_EXCEEDED` - سنووری ڕۆژانەی بەشداریکردن گەیشترا
- `VALIDATION_ERROR` - پارامەترەکانی تێکردن نادروست
- `CURRENCY_NOT_FOUND` - دراو بەردەست نییە
- `WATCH_LIMIT_EXCEEDED** - گەیشت بە ئەوپەڕی دراوە چاودێریکراوەکان
- `WATCH_NOT_FOUND` - دراوی چاودێریکراو نەدۆزرایەوە
- `ACCESS_DENIED` - دەستگەیشتن بە دراو ڕەتکرایەوە (لە لیستی چاودێریدا نییە)
- `TIMEOUT_ERROR` - کاتی داواکاری تەواو بوو
- `NETWORK_ERROR` - کێشەی پەیوەندی تۆڕ
- `INTERNAL_SERVER_ERROR` - هەڵەی سێرڤەر

## سنووری نرخ

SDK بە شێوەی خودکار مامەڵە لەگەڵ سنووری نرخەکان دەکات:

- **پلانی خۆڕایی**: 24 بانگکردنی API ڕۆژانە (یەک لە کاتژمێرێکدا)
- **پلانی پڕۆ**: 1500 بانگکردنی API ڕۆژانە (نزیکەی 62 لە کاتژمێرێکدا)
- **پلانی بزنس**: 4000 بانگکردنی API ڕۆژانە (نزیکەی 166 لە کاتژمێرێکدا)
- **پلانی پلاتینی**: 8640 بانگکردنی API ڕۆژانە (6 لە خولەکێکدا، 360 لە کاتژمێرێکدا)

زانیاری سنووری نرخ لە سەری وەڵام و وردەکاری هەڵەکاندا بەردەستە.

## پلانەکانی بەشداریکردن

### پلانی خۆڕایی - بەخۆڕایی
- **بانگکردنی API**: 24 ڕۆژانە (یەک لە کاتژمێرێکدا)
- **Webhooks**: بەردەست نین
- **پشتگیری**: پشتگیری ئیمەیڵ
- **گونجاو بۆ**: تاقیکردنەوە و پرۆژە کەسییە بچووکەکان

### پلانی پڕۆ - $4.95/مانگ
- **بانگکردنی API**: 1500 ڕۆژانە
- **Webhooks**: بەردەست نین
- **پشتگیری**: پشتگیری ئیمەیڵ
- **گونجاو بۆ**: پرۆژە بچووک و ناوەندیەکان

### پلانی بزنس - $9.95/مانگ
- **بانگکردنی API**: 4000 ڕۆژانە
- **Webhooks**: یەک webhook endpoint
- **پشتگیری**: پشتگیری ئیمەیڵ و چاتی ڕاستەوخۆ
- **گونجاو بۆ**: کۆمپانیا گەشەکەرەکان و نەرمەکاڵای بەرهەمهێنان

### پلانی پلاتینی - $24.95/مانگ
- **بانگکردنی API**: 8640 ڕۆژانە (6 لە خولەکێکدا)
- **Webhooks**: 5 webhook endpoint
- **پشتگیری**: پشتگیری 24/7 بە ئیمەیڵ و چات و تەلەفۆن
- **گونجاو بۆ**: نەرمەکاڵای دامەزراوە و خزمەتگوزاری بەرزی قەبارە

### پلانی تایبەت - پەیوەندی بکە بۆ نرخ
- **بانگکردنی API**: تایبەت بەپێی پێداویستییەکانت
- **Webhooks**: تایبەت بەپێی پێداویستییەکانت
- **پشتگیری**: پشتگیری تەلەفۆن و ئیمەیڵ و چات
- **نرخی تایبەت**: بەپێی پێداویستییەکانت
- **گونجاو بۆ**: دامەزراوەکان لەگەڵ پێداویستی تایبەت

## ڕاوێژە ئادایی

### باشکردنی بەکارهێنانی API بۆ پلانە خۆڕاییەکان

```typescript
// cache بە کاریگەری بەکاربێنە بۆ کەمکردنەوەی بانگکردنی API
const client = new WorxClient({
  apiToken: 'your-free-plan-token',
  cache: { enabled: true, ttl: 600000 } // 10 خولەک بۆ پلانە خۆڕاییەکان
});

// کۆکردنەوەی کردارەکان کاتێک گونجاوە
const [rates, account] = await Promise.all([
  client.getRates(),
  client.getAccountInfo()
]);
```

### نەرمەکاڵا کاتی ڕاستەوخۆیەکان

```typescript
// polling بەکاربێنە بۆ داشبۆردە ڕاستەوخۆیەکان
client.startPolling({
  interval: 120000, // 2 خولەک بۆ پلانە خۆڕاییەکان
  currencies: ['USD', 'EUR', 'GBP'], // چاودێری دراوە دیاریکراوەکان
  onUpdate: (rates) => updateUI(rates)
});

// جێبەجێکردنی شێوازی offline-first
const convertedAmount = client.convert(amount, 'USD', 'EUR');
if (convertedAmount === null) {
  // پاشەکەوت بۆ بانگکردنی API لە حاڵەتی نەبوونی cache
  const eurData = await client.getCurrency('EUR');
  // نرخی تازە بەکاربێنە بۆ نەوە
}
```

## باشترین شێوازەکان

1. **بەڕێوەبردنی cache**: cache چالاک بکە بۆ باشکردنی بەکارهێنانی بەش، بەتایبەت لەسەر پلانە خۆڕاییەکان
2. **چارەسەرکردنی هەڵەکان**: هەمیشە مامەڵە لەگەڵ `WorxError` بکە بۆ ئەزموونێکی گونجاوی بەکارهێنەر
3. **سنووری نرخ**: چاودێری `rateLimitRemaining` لە وەڵامەکاندا بکە بۆ دوورکەوتنەوە لە گەیشتن بە سنوورەکان
4. **پشتگیری offline**: ڕێگای `convert()` بەکاربێنە بۆ حیسابە دراوییەکانی offline
5. **فرە زمان**: `getCurrencyName()` بەکاربێنە بۆ پیشاندانی دراوە ناوخۆییەکان
6. **پاککردنەوەی سەرچاوەکان**: `client.destroy()` بانگ بکە کاتێک تەواو دەبیت بۆ پاککردنەوەی ماوەی polling

## پشتگیری وێبگەڕ

SDK لە وێبگەڕە نوێیەکاندا کار دەکات لەگەڵ پشتگیری fetch. بۆ وێبگەڕە کۆنەکان، polyfill-ی fetch بخەرە ژوورەوە:

```typescript
// بۆ وێبگەڕە کۆنەکان
import 'whatwg-fetch';
import WorxClient from 'exapi-currency-sdk';

const client = new WorxClient({ apiToken: 'your-token' });
```

## بەشداریکردن

1. fork بکە بۆ کۆگا
2. لقی تایبەتمەندییەکەت دروست بکە (`git checkout -b feature/amazing-feature`)
3. گۆڕانکارییەکانت commit بکە (`git commit -m 'Add amazing feature'`)
4. بۆ لقەکە push بکە (`git push origin feature/amazing-feature`)
5. داواکاری کێشان بکەرەوە

## مۆڵەت

ئەم پڕۆژەیە لەژێر مۆڵەتی MIT-دایە - سەیری پەڕگەی [LICENSE](LICENSE) بکە بۆ وردەکارییەکان.

## پشتگیری

- 📧 ئیمەیڵ: support@worx.dev
- 📖 بەڵگەنامە: https://docs.worx.dev
- 🐛 کێشەکان: https://github.com/worx/currency-sdk/issues
- 💬 ديسكۆرد: https://discord.gg/worx

## تۆماری گۆڕانکاری

### v1.0.0
- وەشانی یەکەم
- پشتگیری تەواوی TypeScript
- داپۆشینی تەواوی API v1
- سنووری نرخ و چارەسەرکردنی هەڵەکان
- ئامرازی یارمەتیدەری تەواو
- پشتگیری وێبگەڕ و Node.js
- cache-ی زیرەک و polling-ی کاتی ڕاستەوخۆ
- نەوەی offline و پشتگیری فرە زمان