import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import SkillGapAnalysis from "../components/SkillGapAnalysis";
import SuggestedRoadmap from "../components/SuggestedRoadmap";
import SuggestedJobs from "../components/SuggestedJobs";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Hero />
      <SkillGapAnalysis />
      <SuggestedRoadmap />
      <SuggestedJobs />
    </>
  );
}
