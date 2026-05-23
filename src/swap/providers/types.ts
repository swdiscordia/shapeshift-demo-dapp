// Common interface implemented by every swap provider.
// Adding a new provider means creating a new file in this folder that exports
// an object satisfying SwapProvider, then registering it in ./index.ts.

import type { Token } from '@/data/tokens';

export type QuoteInput = {
  fromChainId: number;
  toChainId: number;
  fromToken: Token;
  toToken: Token;
  /** Amount in base units of `fromToken` (wei for 18-decimal, etc.). */
  amount: string;
  receiveAddress: string;
};

export type Quote = {
  providerName: string;
  /** Amount the user will receive in base units of `toToken`. */
  buyAmount: string;
  rate: string;
  estimatedExecutionTimeMs?: number;
  /** Free-form provider-specific data — kept opaque to the UI. */
  metadata?: Record<string, unknown>;
};

export type SwapProvider = {
  /** Unique provider id, lowercase, hyphenated. */
  id: string;
  /** Display name. */
  label: string;
  /** Whether this provider supports the given chain pair. */
  supports: (fromChainId: number, toChainId: number) => boolean;
  /** Fetch an executable quote. */
  getQuote: (input: QuoteInput) => Promise<Quote>;
};
