import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10120d] px-6 text-[#f8f3e9]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(224,138,92,0.2),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(145,74,41,0.25),transparent_50%)]" />
      <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-xl md:p-10">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#f2b47d]">Offline Mode</p>
        <h1 className="font-display text-4xl leading-tight md:text-5xl">You are currently offline</h1>
        <p className="mt-4 text-sm text-stone-200/90 md:text-base">
          Your connection dropped, but the vibe is still here. Reconnect to keep exploring the gallery and blog.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#e08a5c] px-5 py-2 text-sm font-semibold text-[#21160f] transition hover:bg-[#f2b47d]"
          >
            Back Home
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open Gallery
          </Link>
        </div>
      </section>
    </main>
  );
}
