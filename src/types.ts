/**
 * WORX Currency Exchange SDK Types
 * TypeScript interfaces for the WORX v1 Currency Exchange API
 */

// Base Response Interface
export interface ApiResponse<T = any> {
  success: boolean;
  version: string;
  data?: T;
  meta?: {
    timestamp: string;
    user?: string;
    remainingRequests?: number;
    rateLimitRemaining?: number;
    [key: string]: any;
  };
  error?: {
    code: string;
    message: string;
    details?: string;
    [key: string]: any;
  };
}

// Currency Interfaces
export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface CurrencyRate {
  price: number;
  sell: number;
  purchase: number;
  usd: number;
  lastUpdated: string;
}

export interface CurrencyWithRate extends Currency {
  currency: string; // Add explicit currency property for type safety
  price: number;
  sell: number;
  purchase: number;
  usd: number;
  lastUpdated: string;
  isWatched: boolean;
  watchedAt?: string;
  watchId?: string;
}

export interface DetailedCurrency extends Currency {
  price: number;
  sell: number;
  purchase: number;
  usd: number;
  lastUpdated: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  isWatched: boolean;
  watchedAt?: string;
  watchId?: string;
}

// Rate History Interface
export interface RateHistory {
  price: number;
  sell: number;
  purchase: number;
  timestamp: string;
}

// Analytics Interface
export interface CurrencyAnalytics {
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  dataPoints: number;
}

// Watched Currency Interfaces
export interface WatchedCurrency {
  watchId: string;
  currency: Currency;
  watchedAt: string;
  isActive: boolean;
  currentRate?: CurrencyRate | null;
  status?: string;
}

export interface WatchSummary {
  total: number;
  maxAllowed: number;
  remainingSlots: number;
}

// API Response Data Types
export interface RatesResponse {
  rates: CurrencyWithRate[];
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

export interface CurrencyResponse {
  currency: DetailedCurrency;
  history: RateHistory[];
  analytics: CurrencyAnalytics;
}

export interface WatchedCurrenciesResponse {
  watchedCurrencies: WatchedCurrency[];
  summary: WatchSummary;
  filters?: {
    hasRateData: number;
    withoutRateData: number;
  };
  message?: string;
}

export interface AddWatchResponse {
  watchedCurrency: WatchedCurrency;
  summary: WatchSummary;
  message: string;
}

export interface RemoveWatchResponse {
  removed: {
    currency: Currency;
    removedAt: string;
  };
  summary: WatchSummary;
  message: string;
}

export interface CurrenciesResponse {
  currencies: {
    watched: Array<Currency & { 
      isAvailable: boolean;
      isWatched: boolean;
      watchedAt?: string;
      currentRate?: CurrencyRate;
    }>;
    available: Array<Currency & { 
      isAvailable: boolean;
      isWatched: boolean;
      currentRate?: CurrencyRate;
    }>;
    unavailable: Array<Currency & { 
      isAvailable: boolean;
      isWatched: boolean;
    }>;
  };
  summary: {
    totalCurrencies: number;
    availableCurrencies: number;
    watchedCurrencies: number;
    maxWatchAllowed: number;
    remainingWatchSlots: number;
  };
  metadata: {
    baseCurrency: string;
    supportedCurrencies: string[];
    lastUpdated: number | null;
  };
}

// SDK Configuration
export interface WorxConfig {
  apiToken: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: {
    enabled?: boolean;
    ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  };
}

// Cache Entry
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Polling Configuration
export interface PollingConfig {
  interval: number; // milliseconds
  currencies?: SupportedCurrency[];
  onUpdate?: (data: RatesResponse) => void;
  onError?: (error: WorxError) => void;
}

// Error Types
export class WorxError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly details?: string;
  public readonly rateLimitRemaining?: number;
  public readonly retryAfter?: number;

  constructor(
    message: string,
    code: string,
    statusCode?: number,
    details?: string,
    rateLimitRemaining?: number,
    retryAfter?: number
  ) {
    super(message);
    this.name = 'WorxError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.rateLimitRemaining = rateLimitRemaining;
    this.retryAfter = retryAfter;
  }
}

// Request Options
export interface RequestOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

// Supported Currency Codes
export type SupportedCurrency = 
  | 'USD' | 'EUR' | 'GBP' | 'TRY' | 'IRR' | 'NOK' | 'SEK' 
  | 'JOD' | 'SAR' | 'AED' | 'CAD' | 'AUD' | 'CHF' | 'DKK' 
  | 'QAR' | 'KWD' | 'IQD';

// Webhook Data Interface (for reference)
export interface WebhookData {
  currency: string;
  price: number;
  usd: number;
  timestamp: string;
  previousPrice: number | null;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}