import { createFileRoute, redirect } from '@tanstack/react-router';

// `/` redirects to the workspace
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/workspace' });
  },
});
