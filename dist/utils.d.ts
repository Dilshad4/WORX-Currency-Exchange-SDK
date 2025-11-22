/**
 * WORX Currency Exchange SDK Utilities
 * Helper functions for currency operations
 */
import { SupportedCurrency } from './types';
/**
 * Validate if a currency code is supported
 * @param currency Currency code to validate
 * @returns true if currency is supported
 */
export declare function validateCurrencyCode(currency: string): currency is SupportedCurrency;
/**
 * Format currency value with proper symbol and precision
 * @param amount Amount to format
 * @param currency Currency code
 * @param precision Decimal places (default: 4)
 * @returns Formatted currency string
 */
export declare function formatCurrency(amount: number, currency: SupportedCurrency, precision?: number): string;
/**
 * Calculate percentage change between two values
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change as number
 */
export declare function calculatePercentageChange(current: number, previous: number): number;
/**
 * Get currency symbol for a given currency code
 * @param currency Currency code
 * @returns Currency symbol or code if symbol not found
 */
export declare function getCurrencySymbol(currency: SupportedCurrency): string;
/**
 * Calculate the next rate limit reset time
 * @param resetTime Reset timestamp in milliseconds
 * @returns Seconds until reset
 */
export declare function getSecondsUntilReset(resetTime: number): number;
/**
 * Generate rate limit info string
 * @param remaining Remaining requests
 * @param resetTime Reset timestamp in milliseconds
 * @returns Human-readable rate limit info
 */
export declare function formatRateLimitInfo(remaining: number, resetTime: number): string;
/**
 * Validate and normalize currency code
 * @param currency Currency code to normalize
 * @returns Normalized currency code
 * @throws Error if currency is not supported
 */
export declare function normalizeCurrencyCode(currency: string): SupportedCurrency;
/**
 * Get all supported currency codes
 * @returns Array of supported currency codes
 */
export declare function getSupportedCurrencies(): SupportedCurrency[];
/**
 * Check if rate data is stale (older than threshold)
 * @param lastUpdated ISO timestamp of last update
 * @param hoursThreshold Hours threshold (default: 1)
 * @returns true if data is stale
 */
export declare function isStaleData(lastUpdated: string, hoursThreshold?: number): boolean;
/**
 * Round currency value to appropriate precision based on currency
 * @param value Value to round
 * @param currency Currency code
 * @returns Rounded value
 */
export declare function roundCurrencyValue(value: number, currency: SupportedCurrency): number;
//# sourceMappingURL=utils.d.ts.map