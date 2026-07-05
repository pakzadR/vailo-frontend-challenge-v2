import { SiteNav } from '@/components/site-nav';
import { SiteHero } from '@/components/site-hero';
import { TemplatesSection } from '@/components/templates-section';
import { FeaturesSection } from '@/components/features-section';
import { LiveDemoSection } from '@/components/live-demo-section';
import { PricingSection } from '@/components/pricing-section';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <div id="top">
      <SiteNav />
      <main>
        <SiteHero />
        <TemplatesSection />
        <FeaturesSection />
        <LiveDemoSection />
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
