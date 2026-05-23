'use client';

import { useMemo, useState } from 'react';

import { SUPPORTED_CHAINS } from '@/config/chains';
import { tokensForChain } from '@/data/tokens';
import { PROVIDERS, type Quote } from '@/swap/providers';

export default function SwapPage() {
  const [fromChainId, setFromChainId] = useState<number>(SUPPORTED_CHAINS[0]!.id);
  const [toChainId, setToChainId] = useState<number>(SUPPORTED_CHAINS[0]!.id);
  const [fromSymbol, setFromSymbol] = useState<string>('ETH');
  const [toSymbol, setToSymbol] = useState<string>('USDC');
  const [amount, setAmount] = useState<string>('1');
  const [providerId, setProviderId] = useState<string>(PROVIDERS[0]!.id);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fromTokens = useMemo(() => tokensForChain(fromChainId), [fromChainId]);
  const toTokens = useMemo(() => tokensForChain(toChainId), [toChainId]);
  const availableProviders = useMemo(
    () => PROVIDERS.filter((p) => p.supports(fromChainId, toChainId)),
    [fromChainId, toChainId],
  );

  async function getQuote() {
    setLoading(true);
    setError(null);
    setQuote(null);
    try {
      const provider = PROVIDERS.find((p) => p.id === providerId);
      const fromToken = fromTokens.find((t) => t.symbol === fromSymbol);
      const toToken = toTokens.find((t) => t.symbol === toSymbol);
      if (!provider || !fromToken || !toToken) {
        throw new Error('Pick a provider, fromToken, and toToken.');
      }
      const baseUnits = toBaseUnits(amount, fromToken.decimals);
      const result = await provider.getQuote({
        fromChainId,
        toChainId,
        fromToken,
        toToken,
        amount: baseUnits,
        receiveAddress: '0x0000000000000000000000000000000000000000',
      });
      setQuote(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Swap</h1>
        <p className="text-neutral-400 mt-2">
          Stub UI calling whichever provider is selected. After integration, a{' '}
          <code className="text-neutral-100">shapeshift</code> entry will appear in the
          provider dropdown.
        </p>
      </section>

      <section className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="From chain">
            <Select value={fromChainId} onChange={(v) => setFromChainId(Number(v))}>
              {SUPPORTED_CHAINS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="To chain">
            <Select value={toChainId} onChange={(v) => setToChainId(Number(v))}>
              {SUPPORTED_CHAINS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="From asset">
            <Select value={fromSymbol} onChange={setFromSymbol}>
              {fromTokens.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="To asset">
            <Select value={toSymbol} onChange={setToSymbol}>
              {toTokens.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Amount">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
            />
          </Field>
          <Field label="Provider">
            <Select value={providerId} onChange={setProviderId}>
              {availableProviders.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <button
          onClick={getQuote}
          disabled={loading}
          className="w-full bg-neutral-100 text-neutral-950 rounded-md px-4 py-2.5 text-sm font-medium hover:bg-white disabled:opacity-50 transition"
        >
          {loading ? 'Fetching quote…' : 'Get quote'}
        </button>
      </section>

      {error && (
        <div className="rounded-md border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {quote && (
        <section className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-6 space-y-3">
          <h2 className="text-lg font-medium">
            Quote from <span className="font-mono">{quote.providerName}</span>
          </h2>
          <dl className="grid grid-cols-2 gap-y-1 text-sm">
            <dt className="text-neutral-500">Rate</dt>
            <dd>{quote.rate}</dd>
            <dt className="text-neutral-500">Buy amount (base units)</dt>
            <dd className="font-mono break-all">{quote.buyAmount}</dd>
            <dt className="text-neutral-500">Est. time</dt>
            <dd>{quote.estimatedExecutionTimeMs ?? 0} ms</dd>
          </dl>
          {quote.metadata && (
            <pre className="text-xs text-neutral-500 bg-neutral-950 border border-neutral-800 rounded-md p-3 overflow-x-auto">
              {JSON.stringify(quote.metadata, null, 2)}
            </pre>
          )}
        </section>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-neutral-500">{label}</span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string | number;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
    >
      {children}
    </select>
  );
}

function toBaseUnits(amount: string, decimals: number): string {
  const [whole = '0', frac = ''] = amount.split('.');
  const padded = (frac + '0'.repeat(decimals)).slice(0, decimals);
  const result = `${whole}${padded}`.replace(/^0+/, '') || '0';
  return result;
}
