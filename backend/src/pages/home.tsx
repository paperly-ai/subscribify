import Header from '@/components/landing-page/Header';
import PricingSection from '@/components/landing-page/Pricing';
import HeroFormCenter from '@/components/landing-page/HeroForm';
import SectionDescription from '@/components/landing-page/Features';

export default function HomePage() {
  return (<>
    <Header />
    <HeroFormCenter />
    <SectionDescription />
    <PricingSection />
  </>

  )
}
