export const templateKeys = {
  all: ['templates'] as const,
  list: () => [...templateKeys.all, 'list'] as const,
  preview: (id: string) => [...templateKeys.all, 'preview', id] as const,
};
