import React, { useState, useEffect } from "react";
import { FaYoutube, FaGlobe, FaRocket, FaClock, FaStar } from "react-icons/fa";
import { MdOutlineOpenInNew, MdRefresh } from "react-icons/md";
import { generatePersonalizedRoadmap } from "../services/roadmapService.js";

export default function SuggestedRoadmap({
  selectedSkills = [],
  selectedRole = null,
}) {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRoadmap = async () => {
    if (!selectedRole) {
      setRoadmapData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generatePersonalizedRoadmap(
        selectedSkills,
        selectedRole
      );
      setRoadmapData(result);

      if (!result.success) {
        setError(result.error || "Failed to generate roadmap");
      }
    } catch (err) {
      setError("An unexpected error occurred while generating your roadmap");
      console.error("Roadmap generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Generate roadmap when props change
  useEffect(() => {
    generateRoadmap();
  }, [selectedSkills, selectedRole]);

  const handleRegenerateRoadmap = () => {
    generateRoadmap();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "text-green-600 bg-green-50";
      case "intermediate":
        return "text-yellow-600 bg-yellow-50";
      case "advanced":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const renderLoadingState = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Generating Your Personalized Roadmap
      </h3>
      <p className="text-gray-600">
        AI is analyzing your skills and creating a tailored learning path...
      </p>
    </div>
  );

  const renderErrorState = () => (
    <div className="bg-white border border-red-200 rounded-lg shadow-sm p-12 text-center">
      <div className="text-red-600 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Roadmap Generation Failed
      </h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={handleRegenerateRoadmap}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        <MdRefresh className="w-4 h-4 mr-2" />
        Try Again
      </button>
    </div>
  );

  const renderCompleteState = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
      <div className="text-green-600 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Congratulations!
      </h3>
      <p className="text-gray-600 mb-4">
        {roadmapData?.metadata?.message ||
          "You already have all the essential skills for this role. Consider exploring advanced topics or specializations!"}
      </p>
      <button
        onClick={handleRegenerateRoadmap}
        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        disabled={loading}
      >
        <FaRocket className="w-4 h-4 mr-2" />
        Explore Advanced Topics
      </button>
    </div>
  );

  return (
    <div className="bg-gradient-to-bl from-gray-900 to-gray-800 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI-Powered Learning Roadmap
          </h2>
          <p className="mt-4 text-lg leading-8 text-white">
            A personalized step-by-step guide to bridge your skill gaps
          </p>
          {roadmapData?.metadata && roadmapData.metadata.totalSteps > 0 && (
            <div className="mt-6 flex justify-center space-x-8 text-sm text-white">
              <div className="flex items-center">
                <FaStar className="w-4 h-4 mr-2 text-yellow-400" />
                {roadmapData.metadata.totalSteps} Steps
              </div>
              <div className="flex items-center">
                <FaClock className="w-4 h-4 mr-2 text-blue-400" />
                {roadmapData.metadata.estimatedTime}
              </div>
              <div className="flex items-center">
                <FaRocket className="w-4 h-4 mr-2 text-green-400" />
                {roadmapData.metadata.targetRole}
              </div>
            </div>
          )}
        </div>

        {/* Roadmap Content */}
        <div className="space-y-4">
          {loading && renderLoadingState()}

          {error && !loading && renderErrorState()}

          {!loading &&
            !error &&
            roadmapData?.success &&
            roadmapData.roadmap.length === 0 &&
            renderCompleteState()}

          {!loading &&
            !error &&
            roadmapData?.success &&
            roadmapData.roadmap.length > 0 && (
              <>
                {/* Regenerate Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleRegenerateRoadmap}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={loading}
                  >
                    <MdRefresh className="w-4 h-4 mr-2" />
                    Regenerate Roadmap
                  </button>
                </div>

                {/* Roadmap Steps */}
                {roadmapData.roadmap.map((step) => {
                  const IconComponent =
                    step.type === "VIDEO" ? FaYoutube : FaGlobe;
                  const typeColor =
                    step.type === "VIDEO" ? "text-red-600" : "text-blue-600";

                  return (
                    <div
                      key={step.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl italic font-bold ml-2 text-gray-700">
                            {step.id}.
                          </span>
                        </div>

                        <div className="flex-shrink-0 mt-1">
                          <IconComponent className={`w-6 h-6 ${typeColor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {step.skillName}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3">
                                {step.description}
                              </p>

                              <div className="flex items-center space-x-4 text-xs">
                                <span
                                  className={`px-2 py-1 rounded-full ${getDifficultyColor(
                                    step.difficulty
                                  )}`}
                                >
                                  {step.difficulty}
                                </span>
                                <span className="text-gray-500 flex items-center">
                                  <FaClock className="w-3 h-3 mr-1" />
                                  {step.estimatedTime}
                                </span>
                                <span className="text-gray-500">
                                  {step.type === "VIDEO"
                                    ? "Video Content"
                                    : "Website Resource"}
                                </span>
                              </div>
                            </div>

                            <div className="flex-shrink-0 ml-4">
                              <a
                                href={step.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm"
                              >
                                Start Learning
                                <MdOutlineOpenInNew className="w-4 h-4 ml-2" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

          {!selectedRole && !loading && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FaRocket className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a Role to Get Started
              </h3>
              <p className="text-gray-600">
                Choose your target job role to generate a personalized
                AI-powered learning roadmap.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
