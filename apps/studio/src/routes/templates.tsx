import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/templates')({
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-2xl text-white">
        ▦
      </div>
      <h1 className="text-2xl font-semibold">Templates</h1>
      <p className="max-w-md text-muted-foreground">
        Curated prompts with live previews will fill this grid, each handing its prompt and
        options off to the workspace via typed search params.
      </p>
    </div>
  );
}
