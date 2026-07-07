import { createFileRoute } from '@tanstack/react-router';
import { TemplatesView } from '@/components/templates/templates';

export const Route = createFileRoute('/templates')({
  component: TemplatesView,
});
