import { createFileRoute } from '@tanstack/react-router';
import { TemplatesView } from '@/features/templates/views/templates-view';

export const Route = createFileRoute('/templates')({
  component: TemplatesView,
});
