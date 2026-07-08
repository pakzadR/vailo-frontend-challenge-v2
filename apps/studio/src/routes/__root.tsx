import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
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
        {import.meta.env.DEV && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </>
        )}
      </AppShell>
    </TooltipProvider>
  );
}
