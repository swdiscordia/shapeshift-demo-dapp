// Token registry per chain.
// Source of truth for which assets the app surfaces in swap UIs.

export type Token = {
  symbol: string;
  name: string;
  decimals: number;
  /** EVM address. `null` for the native gas token. */
  address: `0x${string}` | null;
};

export const TOKENS_BY_CHAIN: Record<number, Token[]> = {
  1: [
    { symbol: 'ETH', name: 'Ether', decimals: 18, address: null },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
  ],
  8453: [
    { symbol: 'ETH', name: 'Ether', decimals: 18, address: null },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    },
  ],
  42161: [
    { symbol: 'ETH', name: 'Ether', decimals: 18, address: null },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    },
  ],
};

export function tokensForChain(chainId: number): Token[] {
  return TOKENS_BY_CHAIN[chainId] ?? [];
}

export function findToken(chainId: number, symbol: string): Token | undefined {
  return tokensForChain(chainId).find((t) => t.symbol === symbol);
}
