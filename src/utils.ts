/**
 * WORX Currency Exchange SDK Utilities
 * Helper functions for currency operations
 */

import { SupportedCurrency } from './types';

// Supported currency codes
const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  'USD', 'EUR', 'GBP', 'TRY', 'IRR', 'NOK', 'SEK',
  'JOD', 'SAR', 'AED', 'CAD', 'AUD', 'CHF', 'DKK',
  'QAR', 'KWD', 'IQD'
];

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  TRY: '₺',
  IRR: '﷼',
  NOK: 'kr',
  SEK: 'kr',
  JOD: 'د.ا',
  SAR: '﷼',
  AED: 'د.إ',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  DKK: 'kr',
  QAR: '﷼',
  KWD: 'د.ك',
  IQD: 'ع.د'
};

/**
 * Validate if a currency code is supported
 * @param currency Currency code to validate
 * @returns true if currency is supported
 */
export function validateCurrencyCode(currency: string): currency is SupportedCurrency {
  return SUPPORTED_CURRENCIES.includes(currency.toUpperCase() as SupportedCurrency);
}

/**
 * Format currency value with proper symbol and precision
 * @param amount Amount to format
 * @param currency Currency code
 * @param precision Decimal places (default: 4)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: SupportedCurrency,
  precision: number = 4
): string {
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()] || currency.toUpperCase();
  const formattedAmount = amount.toFixed(precision);
  
  // For currencies that typically show symbol before amount
  if (['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF'].includes(currency.toUpperCase())) {
    return `${symbol}${formattedAmount}`;
  }
  
  // For currencies that show symbol after amount
  return `${formattedAmount} ${symbol}`;
}

/**
 * Calculate percentage change between two values
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change as number
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Get currency symbol for a given currency code
 * @param currency Currency code
 * @returns Currency symbol or code if symbol not found
 */
export function getCurrencySymbol(currency: SupportedCurrency): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] || currency.toUpperCase();
}

/**
 * Calculate the next rate limit reset time
 * @param resetTime Reset timestamp in milliseconds
 * @returns Seconds until reset
 */
export function getSecondsUntilReset(resetTime: number): number {
  const now = Date.now();
  return Math.max(0, Math.ceil((resetTime - now) / 1000));
}

/**
 * Generate rate limit info string
 * @param remaining Remaining requests
 * @param resetTime Reset timestamp in milliseconds
 * @returns Human-readable rate limit info
 */
export function formatRateLimitInfo(remaining: number, resetTime: number): string {
  const secondsUntilReset = getSecondsUntilReset(resetTime);
  return `${remaining} requests remaining, resets in ${secondsUntilReset}s`;
}

/**
 * Validate and normalize currency code
 * @param currency Currency code to normalize
 * @returns Normalized currency code
 * @throws Error if currency is not supported
 */
export function normalizeCurrencyCode(currency: string): SupportedCurrency {
  const normalized = currency.trim().toUpperCase() as SupportedCurrency;
  
  if (!validateCurrencyCode(normalized)) {
    throw new Error(`Unsupported currency code: ${currency}`);
  }
  
  return normalized;
}

/**
 * Get all supported currency codes
 * @returns Array of supported currency codes
 */
export function getSupportedCurrencies(): SupportedCurrency[] {
  return [...SUPPORTED_CURRENCIES];
}

/**
 * Check if rate data is stale (older than threshold)
 * @param lastUpdated ISO timestamp of last update
 * @param hoursThreshold Hours threshold (default: 1)
 * @returns true if data is stale
 */
export function isStaleData(lastUpdated: string, hoursThreshold: number = 1): boolean {
  const now = new Date().getTime();
  const updated = new Date(lastUpdated).getTime();
  const diffHours = (now - updated) / (1000 * 60 * 60);
  return diffHours > hoursThreshold;
}

/**
 * Round currency value to appropriate precision based on currency
 * @param value Value to round
 * @param currency Currency code
 * @returns Rounded value
 */
export function roundCurrencyValue(value: number, currency: SupportedCurrency): number {
  // Currencies with different precision requirements
  const highPrecisionCurrencies = ['IRR', 'IQD']; // Large denomination currencies
  const mediumPrecisionCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  
  if (highPrecisionCurrencies.includes(currency.toUpperCase())) {
    return Math.round(value); // No decimal places
  } else if (mediumPrecisionCurrencies.includes(currency.toUpperCase())) {
    return Math.round(value * 10000) / 10000; // 4 decimal places
  } else {
    return Math.round(value * 1000) / 1000; // 3 decimal places
  }
}