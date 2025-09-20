import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Hero from "../components/Hero";
import SkillGapAnalysis from "../components/SkillGapAnalysis";
import SuggestedRoadmap from "../components/SuggestedRoadmap";
import SuggestedJobs from "../components/SuggestedJobs";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAnalysisSubmitted, setIsAnalysisSubmitted] = useState(false);

  const handleAnalysisSubmit = (skills, role) => {
    setSelectedSkills(skills);
    setSelectedRole(role);
    setIsAnalysisSubmitted(true);

    // Scroll to SkillGapAnalysis section after a short delay to ensure component is rendered
    setTimeout(() => {
      const element = document.getElementById("skill-gap-analysis");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <>
      <Hero onAnalysisSubmit={handleAnalysisSubmit} />
      {isAnalysisSubmitted && (
        <>
          <SkillGapAnalysis
            selectedSkills={selectedSkills}
            selectedRole={selectedRole}
          />
          <SuggestedRoadmap
            selectedSkills={selectedSkills}
            selectedRole={selectedRole}
          />
          <SuggestedJobs
            selectedSkills={selectedSkills}
            selectedRole={selectedRole}
          />
        </>
      )}
    </>
  );
}
