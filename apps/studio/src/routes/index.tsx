import { createFileRoute, redirect } from '@tanstack/react-router';

// `/` redirects to the workspace (RULES §5).
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/workspace' });
  },
});
