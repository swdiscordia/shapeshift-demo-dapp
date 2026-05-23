# shapeshift-demo-dapp

A deliberately minimal Next.js + wagmi dApp used as a demo target for the [shapeshift-mcp](https://github.com/swdiscordia/shapeshift-mcp) integration agent.

## Why this exists

We needed a realistic repo to validate the `integrate shapeshift` workflow end-to-end. This dApp has the patterns the playbook expects — a chain registry, a token registry, a swap-provider abstraction, an HTTP wrapper — but **no ShapeShift integration**. Pointing an agent at it should produce a clean before/after diff.

## What's inside

```
src/
├── app/
│   ├── layout.tsx              wagmi + react-query providers wrap the app
│   ├── page.tsx                landing showing the patterns the integration extends
│   ├── swap/page.tsx           swap UI calling whichever provider is selected
│   └── providers.tsx           WagmiProvider + QueryClientProvider
├── config/
│   ├── chains.ts               SUPPORTED_CHAINS — Ethereum, Base, Arbitrum
│   └── wagmi.ts                createConfig() built from SUPPORTED_CHAINS
├── data/
│   └── tokens.ts               TOKENS_BY_CHAIN — ETH + USDC per chain
├── lib/
│   └── http.ts                 fetch wrapper (httpGet / httpPost / HttpError)
└── swap/
    └── providers/
        ├── types.ts            SwapProvider interface
        ├── mock.ts             demo provider returning a deterministic stub
        └── index.ts            providers map
```

## Running locally

```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

## How to test the shapeshift-mcp integration

1. Install the ShapeShift Claude Code plugin in your global config (or configure the MCP for your editor of choice). See [shapeshift-mcp / README](https://github.com/swdiscordia/shapeshift-mcp).
2. Create a partner code at **https://dashboard.affiliate.shapeshift.com/** if you don't have one (free, ~1 minute) and `export SHAPESHIFT_PARTNER_CODE=<your-code>`. The integration works without one too; only affiliate attribution is missed.
3. `git commit -am "checkpoint"` (the integration runs inside a git worktree, working tree must be clean).
4. Open this repo in your editor and prompt: `integrate shapeshift, USDC and native asset only on receive`.
5. Verify the agent:
   - Creates a worktree `../shapeshift-demo-dapp-shapeshift-integrate-<date>`.
   - Extends `src/config/chains.ts` and `src/data/tokens.ts` with ShapeShift chains/assets (marked with `// @shapeshift:integration` blocks).
   - Creates `src/swap/providers/shapeshift.ts` mirroring `mock.ts`.
   - Writes `shapeshift.config.json` at the repo root.
   - The `/swap` page now lists a `shapeshift` provider that returns real quotes.
