// wagmi config. Uses the chain registry from ./chains.ts.

import { http, createConfig } from 'wagmi';

import { SUPPORTED_CHAINS } from './chains';

const chains = SUPPORTED_CHAINS.map((c) => c.viemChain) as [import('viem').Chain, ...import('viem').Chain[]];

export const wagmiConfig = createConfig({
  chains,
  transports: Object.fromEntries(chains.map((c) => [c.id, http()])),
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
