import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-4 text-center">
      <div>
        <p className="font-display text-8xl text-fire">404</p>
        <p className="mt-2 text-ash-400">Essa página queimou na chapa.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-ember-500/40 px-6 py-3 text-ember-300 transition hover:bg-ember-500/10"
        >
          Voltar ao cardápio
        </Link>
      </div>
    </main>
  );
}
