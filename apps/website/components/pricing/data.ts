export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    name: 'Hobby',
    price: '$0',
    cadence: '/mo',
    blurb: 'For trying things out',
    features: ['50 generations / day', 'Both models', 'History & templates'],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    price: '$16',
    cadence: '/mo',
    blurb: 'For serious creators',
    features: ['Unlimited generations', '4K upscaling', 'Private history', 'Priority queue'],
    cta: 'Upgrade to Pro',
    featured: true,
  },
  {
    name: 'Studio',
    price: '$49',
    cadence: '/mo',
    blurb: 'For teams',
    features: ['Everything in Pro', 'Shared workspaces', 'API access'],
    cta: 'Contact sales',
  },
];
