import Link from 'next/link';

import { SUPPORTED_CHAINS } from '@/config/chains';
import { PROVIDERS } from '@/swap/providers';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          A deliberately minimal dApp.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          This repo exists so the{' '}
          <a
            href="https://github.com/swdiscordia/shapeshift-mcp"
            className="text-neutral-100 underline decoration-dotted underline-offset-4"
          >
            shapeshift-mcp
          </a>{' '}
          integration agent has a realistic target to edit. It has a chain registry, a
          token registry, a swap-provider abstraction, and a fetch wrapper — but{' '}
          <em className="text-neutral-100">no ShapeShift integration yet</em>. Point your
          AI editor at this repo and say <code className="text-neutral-100">integrate shapeshift</code>{' '}
          to see the agent extend the existing structure.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Chains" subtitle={`${SUPPORTED_CHAINS.length} configured`}>
          <ul className="space-y-1 text-sm text-neutral-300">
            {SUPPORTED_CHAINS.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>{c.name}</span>
                <span className="text-neutral-500">id {c.id}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Providers" subtitle={`${PROVIDERS.length} registered`}>
          <ul className="space-y-1 text-sm text-neutral-300">
            {PROVIDERS.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.label}</span>
                <span className="text-neutral-500">{p.id}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Try it</h2>
        <p className="text-neutral-400">
          The{' '}
          <Link href="/swap" className="text-neutral-100 underline decoration-dotted underline-offset-4">
            /swap
          </Link>{' '}
          page calls whichever provider you select. Today it only shows{' '}
          <code className="text-neutral-100">mock</code>. After running{' '}
          <code className="text-neutral-100">integrate shapeshift</code> the page should
          additionally list a <code className="text-neutral-100">shapeshift</code> provider
          returning real quotes from{' '}
          <a
            href="https://api.shapeshift.com/docs"
            className="text-neutral-100 underline decoration-dotted underline-offset-4"
          >
            api.shapeshift.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-medium text-neutral-100">{title}</h3>
        <span className="text-xs text-neutral-500">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}
