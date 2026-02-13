import NavBar from "@/components/cv/NavBar";
import HeroSection from "@/components/cv/HeroSection";
import JourneyTimeline from "@/components/cv/JourneyTimeline";
import SkillsSection from "@/components/cv/SkillsSection";
import RecommendationsSection from "@/components/cv/RecommendationsSection";
import EducationSection from "@/components/cv/EducationSection";
import FooterSection from "@/components/cv/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <JourneyTimeline />
      <SkillsSection />
      <RecommendationsSection />
      <EducationSection />
      <FooterSection />
    </div>
  );
};

export default Index;
