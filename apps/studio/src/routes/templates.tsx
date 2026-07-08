import { createFileRoute } from '@tanstack/react-router';
import { TemplatesView } from '@/features/templates/views/templates-views';

export const Route = createFileRoute('/templates')({
  component: TemplatesView,
});
