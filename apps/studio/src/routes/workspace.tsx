import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/workspace')({
  component: WorkspacePage,
});

function WorkspacePage() {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-gradient-brand text-2xl text-brand-ink">
        ✦
      </div>
      <h1 className="text-2xl font-semibold">Workspace</h1>
      <p className="max-w-md text-muted">
        The generation workspace lands here — prompt, option sidebar, canvas and history. Scaffold
        is wired; feature build comes next.
      </p>
    </div>
  );
}
