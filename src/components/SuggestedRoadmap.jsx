import React from "react";
import { FaYoutube, FaGlobe } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";

export default function SuggestedRoadmap() {
  // Simplified roadmap data with only skill name and type
  const roadmapSteps = [
    {
      id: 1,
      skillName: "Learn React Fundamentals",
      type: "VIDEO",
      link: "https://www.example.com/learn-react-fundamentals",
    },
    {
      id: 2,
      skillName: "JavaScript ES6+ Features",
      type: "SITE",
      link: "https://www.example.com/learn-react-fundamentals",
    },
    {
      id: 3,
      skillName: "State Management (Redux/Zustand)",
      type: "VIDEO",
      link: "https://www.example.com/learn-react-fundamentals",
    },
    {
      id: 4,
      skillName: "Testing with Jest & React Testing Library",
      type: "SITE",
      link: "https://www.example.com/learn-react-fundamentals",
    },
    {
      id: 5,
      skillName: "Node.js and Express",
      type: "VIDEO",
      link: "https://www.example.com/learn-react-fundamentals",
    },
    {
      id: 6,
      skillName: "Database Design",
      type: "SITE",
      link: "https://www.example.com/learn-react-fundamentals",
    },
  ];

  const getTypeIcon = (type) => {
    return type === "VIDEO" ? FaYoutube : FaGlobe;
  };

  const getTypeColor = (type) => {
    return type === "VIDEO" ? "text-red-600" : "text-blue-600";
  };

  return (
    <div className="bg-gradient-to-bl from-gray-900 to-gray-800 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Suggested Learning Roadmap
          </h2>
          <p className="mt-4 text-lg leading-8 text-white">
            A personalized step-by-step guide to bridge your skill gaps
          </p>
        </div>

        {/* Vertical Roadmap */}
        <div className="space-y-4">
          {roadmapSteps.map((step) => {
            const IconComponent = getTypeIcon(step.type);
            return (
              <div
                key={step.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => {
                  // Add your redirect logic here
                  console.log(`Redirecting to: ${step.skillName}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl italic font-bold ml-2">
                      {step.id}.
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <IconComponent
                      className={`w-6 h-6 ${getTypeColor(step.type)}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.skillName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {step.type === "VIDEO"
                        ? "Video Content"
                        : "Website Resource"}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <a href={step.link}>
                      <MdOutlineOpenInNew className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
