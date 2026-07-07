import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceView } from '@/components/workspace/workspace';

export const Route = createFileRoute('/workspace')({
  component: WorkspaceView,
});
