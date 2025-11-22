/**
 * WORX Currency Exchange SDK Client
 * Professional TypeScript SDK for WORX v1 Currency Exchange API
 */
import { WorxConfig, RatesResponse, CurrencyResponse, WatchedCurrenciesResponse, AddWatchResponse, RemoveWatchResponse, CurrenciesResponse, SupportedCurrency, RequestOptions, PollingConfig } from './types';
export declare class WorxClient {
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
export declare function createWorxClient(config: WorxConfig): WorxClient;
export default WorxClient;
//# sourceMappingURL=client.d.ts.map