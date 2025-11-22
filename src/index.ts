/**
 * WORX Currency Exchange SDK
 * Professional TypeScript SDK for real-time currency exchange rates
 * 
 * @version 1.0.0
 * @author WORX Team
 * @license MIT
 */

// Main Client
export { WorxClient, createWorxClient } from './client';

// Types
export * from './types';

// Utilities (core only)
export { validateCurrencyCode, formatCurrency, calculatePercentageChange, getCurrencySymbol } from './utils';

// Version info
export const VERSION = '1.0.0';

// Default export
export { WorxClient as default } from './client';