import { SiteNav } from '@/components/sections/nav';
import { SiteHero } from '@/components/sections/hero';
import { TemplatesSection } from '@/components/sections/templates';
import { FeaturesSection } from '@/components/sections/features';
import { LiveDemoSection } from '@/components/sections/live-demo';
import { PricingSection } from '@/components/sections/pricing';
import { SiteFooter } from '@/components/sections/footer';

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
