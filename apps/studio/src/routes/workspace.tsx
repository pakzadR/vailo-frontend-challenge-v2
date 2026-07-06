import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceView } from '@/features/generation/views/workspace-view';

export const Route = createFileRoute('/workspace')({
  component: WorkspaceView,
});
