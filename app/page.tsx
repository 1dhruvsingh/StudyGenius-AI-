import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto">
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}