/**
 * WORX Currency Exchange SDK Client
 * Professional TypeScript SDK for WORX v1 Currency Exchange API
 */

import {
  WorxConfig,
  WorxError,
  ApiResponse,
  RatesResponse,
  CurrencyResponse,
  WatchedCurrenciesResponse,
  AddWatchResponse,
  RemoveWatchResponse,
  CurrenciesResponse,
  SupportedCurrency,
  RequestOptions,
  CacheEntry,
  PollingConfig,
} from './types';

export class WorxClient {
  private readonly apiToken: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly retryDelay: number;
  private readonly cacheEnabled: boolean;
  private readonly cacheTtl: number;
  private readonly cache: Map<string, CacheEntry<any>>;
  private pollingInterval: NodeJS.Timeout | null = null;

  constructor(config: WorxConfig) {
    this.apiToken = config.apiToken;
    this.baseUrl = config.baseUrl || 'https://api.worx.dev';
    this.timeout = config.timeout || 30000;
    this.retries = config.retries || 3;
    this.retryDelay = config.retryDelay || 1000;
    this.cacheEnabled = config.cache?.enabled ?? true;
    this.cacheTtl = config.cache?.ttl ?? 300000; // 5 minutes default
    this.cache = new Map();

    if (!this.apiToken) {
      throw new Error('API token is required');
    }
  }

  /**
   * Check if cached data is still valid
   */
  private isCacheValid<T>(cacheKey: string): boolean {
    if (!this.cacheEnabled) return false;
    
    const cached = this.cache.get(cacheKey);
    if (!cached) return false;
    
    const now = Date.now();
    return (now - cached.timestamp) < cached.ttl;
  }

  /**
   * Get data from cache
   */
  private getFromCache<T>(cacheKey: string): T | null {
    if (!this.isCacheValid(cacheKey)) {
      this.cache.delete(cacheKey);
      return null;
    }
    
    return this.cache.get(cacheKey)?.data || null;
  }

  /**
   * Store data in cache
   */
  private setCache<T>(cacheKey: string, data: T, customTtl?: number): void {
    if (!this.cacheEnabled) return;
    
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl: customTtl || this.cacheTtl
    });
  }

  /**
   * Clear all cached data
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Make HTTP request with retry logic and error handling
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const timeout = requestOptions?.timeout || this.timeout;
    const retries = requestOptions?.retries || this.retries;
    const retryDelay = requestOptions?.retryDelay || this.retryDelay;

    const headers = {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'worx-currency-sdk/1.0.0',
      ...options.headers,
    };

    let lastError: WorxError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data: ApiResponse<T> = await response.json();

        if (!response.ok) {
          const error = data.error || { code: 'HTTP_ERROR', message: `HTTP ${response.status}` };
          throw new WorxError(
            error.message || `HTTP ${response.status}`,
            error.code || 'HTTP_ERROR',
            response.status,
            error.details,
            data.meta?.rateLimitRemaining,
            response.headers.get('Retry-After') 
              ? parseInt(response.headers.get('Retry-After')!) 
              : undefined
          );
        }

        return data;

      } catch (error) {
        if (error instanceof WorxError) {
          lastError = error;
          
          // Don't retry on client errors (400-499) except rate limits
          if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500 && error.statusCode !== 429) {
            throw error;
          }
        } else if (error instanceof Error) {
          if (error.name === 'AbortError') {
            lastError = new WorxError('Request timeout', 'TIMEOUT_ERROR');
          } else {
            lastError = new WorxError(error.message, 'NETWORK_ERROR');
          }
        } else {
          lastError = new WorxError('Unknown error', 'UNKNOWN_ERROR');
        }

        // Wait before retry (with exponential backoff)
        if (attempt < retries) {
          const delay = retryDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }

  /**
   * Get all exchange rates based on user's watching preferences
   * Returns watched currencies if any, otherwise all available currencies
   */
  async getRates(options?: RequestOptions): Promise<RatesResponse> {
    const cacheKey = 'rates';
    
    // Try cache first
    const cached = this.getFromCache<RatesResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    const response = await this.makeRequest<RatesResponse>('/rates', {}, options);
    const data = response.data!;
    
    // Cache the response
    this.setCache(cacheKey, data);
    
    return data;
  }

  /**
   * Get specific currency exchange rate with history and analytics
   * @param currency Currency code (e.g., 'EUR', 'GBP', 'TRY')
   */
  async getCurrency(currency: SupportedCurrency, options?: RequestOptions): Promise<CurrencyResponse> {
    const cacheKey = `currency_${currency.toUpperCase()}`;
    
    // Try cache first
    const cached = this.getFromCache<CurrencyResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    const response = await this.makeRequest<CurrencyResponse>(
      `/rates/${currency.toUpperCase()}`,
      {},
      options
    );
    const data = response.data!;
    
    // Cache the response (shorter TTL for individual currencies)
    this.setCache(cacheKey, data, this.cacheTtl / 2);
    
    return data;
  }

  /**
   * Get user's watched currencies with their current rates
   */
  async getWatchedCurrencies(options?: RequestOptions): Promise<WatchedCurrenciesResponse> {
    const response = await this.makeRequest<WatchedCurrenciesResponse>('/watched', {}, options);
    return response.data!;
  }

  /**
   * Add currency to watch list
   * @param currency Currency code to watch (e.g., 'EUR', 'GBP', 'TRY')
   */
  async addWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions): Promise<AddWatchResponse> {
    const response = await this.makeRequest<AddWatchResponse>(
      '/watched',
      {
        method: 'POST',
        body: JSON.stringify({ currency: currency.toUpperCase() }),
      },
      options
    );
    return response.data!;
  }

  /**
   * Remove currency from watch list
   * @param currency Currency code to unwatch (e.g., 'EUR', 'GBP', 'TRY')
   */
  async removeWatchedCurrency(currency: SupportedCurrency, options?: RequestOptions): Promise<RemoveWatchResponse> {
    const response = await this.makeRequest<RemoveWatchResponse>(
      `/watched?currency=${currency.toUpperCase()}`,
      { method: 'DELETE' },
      options
    );
    return response.data!;
  }

  /**
   * Get all available currencies with their metadata
   * Includes watched status and current rates
   */
  async getCurrencies(options?: RequestOptions): Promise<CurrenciesResponse> {
    const response = await this.makeRequest<CurrenciesResponse>('/currencies', {}, options);
    return response.data!;
  }

  /**
   * Check if a currency is supported
   * @param currency Currency code to check
   */
  async isCurrencySupported(currency: string): Promise<boolean> {
    try {
      const currencies = await this.getCurrencies();
      const supportedCodes = currencies.metadata.supportedCurrencies;
      return supportedCodes.includes(currency.toUpperCase());
    } catch (error) {
      return false;
    }
  }

  /**
   * Get account information (from API response meta)
   * Returns current rate limits and subscription info
   */
  async getAccountInfo(options?: RequestOptions): Promise<{
    user?: string;
    remainingRequests?: number;
    rateLimitRemaining?: number;
    timestamp: string;
  }> {
    const response = await this.makeRequest('/currencies', {}, options);
    return {
      user: response.meta?.user,
      remainingRequests: response.meta?.remainingRequests,
      rateLimitRemaining: response.meta?.rateLimitRemaining,
      timestamp: response.meta?.timestamp || new Date().toISOString(),
    };
  }

  /**
   * Convert amount from one currency to another using cached rates
   * @param amount Amount to convert
   * @param fromCurrency Source currency
   * @param toCurrency Target currency
   * @returns Converted amount or null if rates not available in cache
   */
  convert(amount: number, fromCurrency: SupportedCurrency, toCurrency: SupportedCurrency): number | null {
    const ratesCache = this.getFromCache<RatesResponse>('rates');
    if (!ratesCache) {
      return null;
    }

    const fromRate = ratesCache.rates.find(r => r.currency === fromCurrency.toUpperCase());
    const toRate = ratesCache.rates.find(r => r.currency === toCurrency.toUpperCase());

    if (!fromRate || !toRate) {
      return null;
    }

    // Convert through USD as base currency
    const amountInUSD = amount / fromRate.price;
    return amountInUSD * toRate.price;
  }

  /**
   * Start polling for rate updates
   * @param config Polling configuration
   */
  startPolling(config: PollingConfig): void {
    if (this.pollingInterval) {
      this.stopPolling();
    }

    const poll = async () => {
      try {
        // Clear cache before fetching new data
        this.clearCache();
        
        const rates = await this.getRates();
        
        // Filter by specific currencies if provided
        if (config.currencies && config.currencies.length > 0) {
          const filteredRates = {
            ...rates,
            rates: rates.rates.filter(r => 
              config.currencies!.includes(r.currency as SupportedCurrency)
            )
          };
          config.onUpdate?.(filteredRates);
        } else {
          config.onUpdate?.(rates);
        }
      } catch (error) {
        if (error instanceof WorxError) {
          config.onError?.(error);
        } else {
          config.onError?.(new WorxError(
            error instanceof Error ? error.message : 'Unknown error',
            'POLLING_ERROR'
          ));
        }
      }
    };

    // Initial fetch
    poll();

    // Set up interval
    this.pollingInterval = setInterval(poll, config.interval);
  }

  /**
   * Stop polling for rate updates
   */
  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  /**
   * Check if polling is active
   */
  isPolling(): boolean {
    return this.pollingInterval !== null;
  }

  /**
   * Get currency name in specified language
   * @param currency Currency code
   * @param language Language code ('en', 'ku', 'ar')
   */
  getCurrencyName(currency: SupportedCurrency, language: 'en' | 'ku' | 'ar' = 'en'): string {
    const names: Record<SupportedCurrency, Record<string, string>> = {
      USD: { en: 'US Dollar', ku: 'دۆلاری ئەمریکی', ar: 'الدولار الأمريكي' },
      EUR: { en: 'Euro', ku: 'یۆرۆ', ar: 'اليورو' },
      GBP: { en: 'British Pound', ku: 'پاوەندی بریتانی', ar: 'الجنيه البريطاني' },
      TRY: { en: 'Turkish Lira', ku: 'لیرەی تورکی', ar: 'الليرة التركية' },
      IRR: { en: 'Iranian Rial', ku: 'ڕیالی ئێرانی', ar: 'الريال الإيراني' },
      NOK: { en: 'Norwegian Krone', ku: 'کرۆنی نۆرویژی', ar: 'الكرونة النرويجية' },
      SEK: { en: 'Swedish Krona', ku: 'کرۆنای سویدی', ar: 'الكرونة السويدية' },
      JOD: { en: 'Jordanian Dinar', ku: 'دیناری ئوردونی', ar: 'الدينار الأردني' },
      SAR: { en: 'Saudi Riyal', ku: 'ڕیالی سعودی', ar: 'الريال السعودي' },
      AED: { en: 'UAE Dirham', ku: 'درهەمی ئیمارات', ar: 'الدرهم الإماراتي' },
      CAD: { en: 'Canadian Dollar', ku: 'دۆلاری کەنەدی', ar: 'الدولار الكندي' },
      AUD: { en: 'Australian Dollar', ku: 'دۆلاری ئۆسترالی', ar: 'الدولار الأسترالي' },
      CHF: { en: 'Swiss Franc', ku: 'فرانکی سویسری', ar: 'الفرنك السويسري' },
      DKK: { en: 'Danish Krone', ku: 'کرۆنی دانماركی', ar: 'الكرونة الدنماركية' },
      QAR: { en: 'Qatari Riyal', ku: 'ڕیالی قەتەری', ar: 'الريال القطري' },
      KWD: { en: 'Kuwaiti Dinar', ku: 'دیناری کوەیتی', ar: 'الدينار الكويتي' },
      IQD: { en: 'Iraqi Dinar', ku: 'دیناری عێراقی', ar: 'الدينار العراقي' }
    };

    return names[currency.toUpperCase() as SupportedCurrency]?.[language] || currency.toUpperCase();
  }

  /**
   * Clean up resources (stop polling, clear cache)
   */
  destroy(): void {
    this.stopPolling();
    this.clearCache();
  }
}

// Convenience factory function
export function createWorxClient(config: WorxConfig): WorxClient {
  return new WorxClient(config);
}

// Default export
export default WorxClient;