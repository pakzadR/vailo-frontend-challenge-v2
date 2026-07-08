import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@/components/ui/app-shell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GenerationWatcher } from '@/features/generation/views/generation-watcher-views';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <TooltipProvider delayDuration={300}>
      <AppShell>
        <GenerationWatcher />
        <Outlet />
      </AppShell>
    </TooltipProvider>
  );
}
