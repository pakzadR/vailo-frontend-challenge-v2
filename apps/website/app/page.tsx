import { SiteNav } from '@/components/nav/nav';
import { SiteHero } from '@/components/hero/hero';
import { TemplatesSection } from '@/components/templates/templates';
import { HighlightsSection } from '@/components/highlights/highlights';
import { LiveDemoSection } from '@/components/live-demo/live-demo';
import { PricingSection } from '@/components/pricing/pricing';
import { SiteFooter } from '@/components/footer/footer';

export default function HomePage() {
  return (
    <div id="top">
      <SiteNav />
      <main>
        <SiteHero />
        <TemplatesSection />
        <HighlightsSection />
        <LiveDemoSection />
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
