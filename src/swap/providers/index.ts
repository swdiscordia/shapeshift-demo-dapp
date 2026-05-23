// Registry of swap providers. Add new providers to PROVIDERS to expose them
// to the UI; the swap page will iterate the array and pick the best quote.

import { mockProvider } from './mock';
import type { SwapProvider } from './types';

export const PROVIDERS: SwapProvider[] = [mockProvider];

export function findProvider(id: string): SwapProvider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}

export type { SwapProvider, Quote, QuoteInput } from './types';
