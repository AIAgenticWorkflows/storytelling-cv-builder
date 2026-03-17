import NavBar from "@/components/cv/NavBar";
import HeroSection from "@/components/cv/HeroSection";
import JourneyTimeline from "@/components/cv/JourneyTimeline";
import SkillsSection from "@/components/cv/SkillsSection";
import ThoughtLeadershipSection from "@/components/cv/ThoughtLeadershipSection";
import RoleTailoringSection from "@/components/cv/RoleTailoringSection";
import RecommendationsSection from "@/components/cv/RecommendationsSection";
import EducationSection from "@/components/cv/EducationSection";
import FooterSection from "@/components/cv/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <JourneyTimeline />
      <ThoughtLeadershipSection />
      <SkillsSection />
      <RecommendationsSection />
      <EducationSection />
      <RoleTailoringSection />
      <FooterSection />
    </div>
  );
};

export default Index;
