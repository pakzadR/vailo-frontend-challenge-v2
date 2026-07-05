const STUDIO_URL = process.env.NEXT_PUBLIC_STUDIO_URL ?? 'http://localhost:5173';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-8 px-6 py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
        <span className="size-2 rounded-full bg-brand-500" />
        Marketing site scaffold
      </span>

      <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
        Turn a prompt into a{' '}
        <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
          picture
        </span>
        .
      </h1>

      <p className="max-w-xl text-balance text-lg text-muted-foreground">
        Pixa Studio is a tiny AI image-generation product with fine-grained control over model,
        aspect ratio and seed. This landing page is the scaffold — hero, features, live demo and
        pricing come next.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={STUDIO_URL}
          className="rounded-lg bg-brand-600 px-5 py-3 font-medium text-white transition-colors hover:bg-brand-700"
        >
          Open the Studio
        </a>
        <a
          href="#features"
          className="rounded-lg border border-border px-5 py-3 font-medium transition-colors hover:bg-muted"
        >
          Learn more
        </a>
      </div>
    </main>
  );
}
