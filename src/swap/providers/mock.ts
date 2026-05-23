// Mock swap provider used by the demo UI while no real provider is wired up.
// New providers in this directory should mirror this shape (id, label,
// supports, getQuote) and register themselves in ./index.ts.

import type { SwapProvider } from './types';

export const mockProvider: SwapProvider = {
  id: 'mock',
  label: 'Demo Mock',
  supports: () => true,
  getQuote: async ({ amount, fromToken, toToken }) => {
    // Deterministic stub: rate = 1.0, buyAmount adjusted for decimals delta.
    const decimalsDelta = toToken.decimals - fromToken.decimals;
    const buyAmount =
      decimalsDelta >= 0
        ? `${amount}${'0'.repeat(decimalsDelta)}`
        : amount.slice(0, Math.max(amount.length + decimalsDelta, 1));
    return {
      providerName: 'mock',
      buyAmount,
      rate: '1.0',
      estimatedExecutionTimeMs: 0,
      metadata: { note: 'This is a deterministic mock — wire up a real provider.' },
    };
  },
};
