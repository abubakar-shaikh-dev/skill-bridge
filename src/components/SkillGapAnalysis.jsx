import React from "react";

export default function SkillGapAnalysis() {
  // Mock data - you can replace this with actual data from your analysis
  const skillGapPercentage = 75;

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Analysis for Skill Gap
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover the gap between your current skills and your dream job
            requirements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Percentage Display */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold">{skillGapPercentage}%</div>
                <div className="text-sm font-medium">Skill Match</div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Skill Compatibility
            </h3>
            <p className="text-gray-600 text-lg">
              Based on your selected skills and target job role, you have a{" "}
              <span className="font-semibold text-purple-600">
                {skillGapPercentage}% match
              </span>{" "}
              with the requirements.
            </p>
          </div>

          {/* Chart Container */}
          <div className="flex justify-center">
            <div className="w-96 h-96 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
              {/* Placeholder for ApexCharts */}
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">Skill Gap Analysis Chart</p>
                <p className="text-xs text-gray-400 mt-1">
                  ApexCharts integration coming soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-2">8</div>
            <div className="text-sm font-medium text-gray-900">
              Matching Skills
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Skills you already have
            </div>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-2">3</div>
            <div className="text-sm font-medium text-gray-900">
              Skills to Learn
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Recommended for improvement
            </div>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
            <div className="text-sm font-medium text-gray-900">
              Critical Gaps
            </div>
            <div className="text-xs text-gray-500 mt-1">
              High priority skills missing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
