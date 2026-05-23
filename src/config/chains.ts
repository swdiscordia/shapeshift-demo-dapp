// Chain registry for the demo dApp.
// This is the source of truth for which chains the app supports.
// To extend with a new provider's chains, append entries here AND
// update src/config/wagmi.ts and src/data/tokens.ts.

import { arbitrum, base, mainnet } from 'viem/chains';
import type { Chain } from 'viem';

export type SupportedChain = {
  id: number;
  name: string;
  nativeSymbol: string;
  viemChain: Chain;
};

export const SUPPORTED_CHAINS: SupportedChain[] = [
  {
    id: mainnet.id,
    name: 'Ethereum',
    nativeSymbol: 'ETH',
    viemChain: mainnet,
  },
  {
    id: base.id,
    name: 'Base',
    nativeSymbol: 'ETH',
    viemChain: base,
  },
  {
    id: arbitrum.id,
    name: 'Arbitrum',
    nativeSymbol: 'ETH',
    viemChain: arbitrum,
  },
];

export function getChain(id: number): SupportedChain | undefined {
  return SUPPORTED_CHAINS.find((c) => c.id === id);
}
