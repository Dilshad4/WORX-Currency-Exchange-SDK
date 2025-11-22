/**
 * WORX Currency Exchange SDK Types
 * TypeScript interfaces for the WORX v1 Currency Exchange API
 */
interface ApiResponse<T = any> {
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
interface Currency {
    code: string;
    name: string;
    flag: string;
}
interface CurrencyRate {
    price: number;
    sell: number;
    purchase: number;
    usd: number;
    lastUpdated: string;
}
interface CurrencyWithRate extends Currency {
    currency: string;
    price: number;
    sell: number;
    purchase: number;
    usd: number;
    lastUpdated: string;
    isWatched: boolean;
    watchedAt?: string;
    watchId?: string;
}
interface DetailedCurrency extends Currency {
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
interface RateHistory {
    price: number;
    sell: number;
    purchase: number;
    timestamp: string;
}
interface CurrencyAnalytics {
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
    dataPoints: number;
}
interface WatchedCurrency {
    watchId: string;
    currency: Currency;
    watchedAt: string;
    isActive: boolean;
    currentRate?: CurrencyRate | null;
    status?: string;
}
interface WatchSummary {
    total: number;
    maxAllowed: number;
    remainingSlots: number;
}
interface RatesResponse {
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
interface CurrencyResponse {
    currency: DetailedCurrency;
    history: RateHistory[];
    analytics: CurrencyAnalytics;
}
interface WatchedCurrenciesResponse {
    watchedCurrencies: WatchedCurrency[];
    summary: WatchSummary;
    filters?: {
        hasRateData: number;
        withoutRateData: number;
    };
    message?: string;
}
interface AddWatchResponse {
    watchedCurrency: WatchedCurrency;
    summary: WatchSummary;
    message: string;
}
interface RemoveWatchResponse {
    removed: {
        currency: Currency;
        removedAt: string;
    };
    summary: WatchSummary;
    message: string;
}
interface CurrenciesResponse {
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
interface WorxConfig {
    apiToken: string;
    baseUrl?: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    cache?: {
        enabled?: boolean;
        ttl?: number;
    };
}
interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}
interface PollingConfig {
    interval: number;
    currencies?: SupportedCurrency[];
    onUpdate?: (data: RatesResponse) => void;
    onError?: (error: WorxError) => void;
}
declare class WorxError extends Error {
    readonly code: string;
    readonly statusCode?: number;
    readonly details?: string;
    readonly rateLimitRemaining?: number;
    readonly retryAfter?: number;
    constructor(message: string, code: string, statusCode?: number, details?: string, rateLimitRemaining?: number, retryAfter?: number);
}
interface RequestOptions {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
}
type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'TRY' | 'IRR' | 'NOK' | 'SEK' | 'JOD' | 'SAR' | 'AED' | 'CAD' | 'AUD' | 'CHF' | 'DKK' | 'QAR' | 'KWD' | 'IQD';
interface WebhookData {
    currency: string;
    price: number;
    usd: number;
    timestamp: string;
    previousPrice: number | null;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'stable';
}

/**
 * WORX Currency Exchange SDK Client
 * Professional TypeScript SDK for WORX v1 Currency Exchange API
 */

declare class WorxClient {
    private readonly apiToken;
    private readonly baseUrl;
    private readonly timeout;
    private readonly retries;
    private readonly retryDelay;
    private readonly cacheEnabled;
    private readonly cacheTtl;
    private readonly cache;
    private pollingInterval;
    constructor(config: WorxConfig);
    /**
     * Check if cached data is still valid
     */
    private isCacheValid;
    /**
     * Get data from cache
     */
    private getFromCache;
    /**
     * Store data in cache
     */
    private setCache;
    /**
     * Clear all cached data
     */
    clearCache(): void;
    /**
     * Make HTTP request with retry logic and error handling
     */
    private makeRequest;
    /**
     * Get all exchange rates based on user's watching preferences
     * Returns watched currencies if any, otherwise all available currencies
     */
    getRates(options?: RequestOptions): Promise<RatesResponse>;
    /**
     * Get specific currency exchange rate with history and analytics
     * @param currency Currency code (e.g., 'EUR', 'GBP', 'TRY')
     */
    getCurrency(currency: SupportedCurrency, options?: RequestOptions): Promise<CurrencyResponse>;
    /**
     * Get user's watched currencies with their current rates
     */
    getWatchedCurrencies(options?: RequestOptions): Promise<WatchedCurrenciesResponse>;
    /**
     * Add currency to watch list
     * @param currency Currency code to watch (e.g., 'EUR', 'GBP', 'TRY')
     */
    addWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions): Promise<AddWatchResponse>;
    /**
     * Remove currency from watch list
     * @param currency Currency code to unwatch (e.g., 'EUR', 'GBP', 'TRY')
     */
    removeWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions): Promise<RemoveWatchResponse>;
    /**
     * Get all available currencies with their metadata
     * Includes watched status and current rates
     */
    getCurrencies(options?: RequestOptions): Promise<CurrenciesResponse>;
    /**
     * Check if a currency is supported
     * @param currency Currency code to check
     */
    isCurrencySupported(currency: string): Promise<boolean>;
    /**
     * Get account information (from API response meta)
     * Returns current rate limits and subscription info
     */
    getAccountInfo(options?: RequestOptions): Promise<{
        user?: string;
        remainingRequests?: number;
        rateLimitRemaining?: number;
        timestamp: string;
    }>;
    /**
     * Convert amount from one currency to another using cached rates
     * @param amount Amount to convert
     * @param fromCurrency Source currency
     * @param toCurrency Target currency
     * @returns Converted amount or null if rates not available in cache
     */
    convert(amount: number, fromCurrency: SupportedCurrency, toCurrency: SupportedCurrency): number | null;
    /**
     * Start polling for rate updates
     * @param config Polling configuration
     */
    startPolling(config: PollingConfig): void;
    /**
     * Stop polling for rate updates
     */
    stopPolling(): void;
    /**
     * Check if polling is active
     */
    isPolling(): boolean;
    /**
     * Get currency name in specified language
     * @param currency Currency code
     * @param language Language code ('en', 'ku', 'ar')
     */
    getCurrencyName(currency: SupportedCurrency, language?: 'en' | 'ku' | 'ar'): string;
    /**
     * Clean up resources (stop polling, clear cache)
     */
    destroy(): void;
}
declare function createWorxClient(config: WorxConfig): WorxClient;

/**
 * WORX Currency Exchange SDK Utilities
 * Helper functions for currency operations
 */

/**
 * Validate if a currency code is supported
 * @param currency Currency code to validate
 * @returns true if currency is supported
 */
declare function validateCurrencyCode(currency: string): currency is SupportedCurrency;
/**
 * Format currency value with proper symbol and precision
 * @param amount Amount to format
 * @param currency Currency code
 * @param precision Decimal places (default: 4)
 * @returns Formatted currency string
 */
declare function formatCurrency(amount: number, currency: SupportedCurrency, precision?: number): string;
/**
 * Calculate percentage change between two values
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change as number
 */
declare function calculatePercentageChange(current: number, previous: number): number;
/**
 * Get currency symbol for a given currency code
 * @param currency Currency code
 * @returns Currency symbol or code if symbol not found
 */
declare function getCurrencySymbol(currency: SupportedCurrency): string;

/**
 * WORX Currency Exchange SDK
 * Professional TypeScript SDK for real-time currency exchange rates
 *
 * @version 1.0.0
 * @author WORX Team
 * @license MIT
 */

declare const VERSION = "1.0.0";

export { VERSION, WorxClient, WorxError, calculatePercentageChange, createWorxClient, WorxClient as default, formatCurrency, getCurrencySymbol, validateCurrencyCode };
export type { AddWatchResponse, ApiResponse, CacheEntry, CurrenciesResponse, Currency, CurrencyAnalytics, CurrencyRate, CurrencyResponse, CurrencyWithRate, DetailedCurrency, PollingConfig, RateHistory, RatesResponse, RemoveWatchResponse, RequestOptions, SupportedCurrency, WatchSummary, WatchedCurrenciesResponse, WatchedCurrency, WebhookData, WorxConfig };
