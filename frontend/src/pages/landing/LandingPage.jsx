import HeroSection from '../../components/landing/HeroSection';
import StatsSection from '../../components/landing/StatsSection';
import CategoryCard from '../../components/landing/CategoryCard';
import MissionSection from '../../components/landing/MissionSection';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <CategoryCard />
      <MissionSection />
    </main>
  );
}
