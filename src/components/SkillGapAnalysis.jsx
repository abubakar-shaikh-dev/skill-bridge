import React from "react";
import Chart from "react-apexcharts";
import { jobRoleSkills } from "../data/jobRoleSkills.js";

export default function SkillGapAnalysis({
  selectedSkills = [],
  selectedRole = null,
}) {
  // Calculate skill match percentage
  const calculateSkillMatch = () => {
    if (!selectedRole || !selectedSkills.length) return 0;

    const requiredSkills = jobRoleSkills[selectedRole] || [];
    if (requiredSkills.length === 0) return 0;

    const matchingSkills = selectedSkills.filter((skill) =>
      requiredSkills.includes(skill)
    );

    return Math.round((matchingSkills.length / requiredSkills.length) * 100);
  };

  const getSkillBreakdown = () => {
    if (!selectedRole) return { matching: 0, toLearn: 0 };

    const requiredSkills = jobRoleSkills[selectedRole] || [];
    const matchingSkills = selectedSkills.filter((skill) =>
      requiredSkills.includes(skill)
    );
    const skillsToLearn = requiredSkills.filter(
      (skill) => !selectedSkills.includes(skill)
    );

    return {
      matching: matchingSkills.length,
      toLearn: skillsToLearn.length,
    };
  };

  const skillGapPercentage = calculateSkillMatch();
  const skillBreakdown = getSkillBreakdown();

  // Chart configuration for ApexCharts
  const chartOptions = {
    chart: {
      type: "donut",
      width: "100%",
      height: 350,
    },
    labels: ["Skills You Have", "Skills to Learn"],
    colors: ["#10B981", "#F59E0B"],
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              label: "Total Skills",
              fontSize: "14px",
              fontWeight: 400,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [skillBreakdown.matching, skillBreakdown.toLearn];

  return (
    <div id="skill-gap-analysis" className="bg-gray-50 py-16 sm:py-24">
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
            <div className="w-96 h-96 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              {selectedRole &&
              (skillBreakdown.matching > 0 || skillBreakdown.toLearn > 0) ? (
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                  height={350}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                  <div>
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
                    <p className="text-sm font-medium">
                      Select a role and skills
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      to see your skill analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-3">
              {skillBreakdown.matching}
            </div>
            <div className="text-lg font-medium text-gray-900 mb-2">
              Skills You Have
            </div>
            <div className="text-sm text-gray-500">
              Skills that match your target role
            </div>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-3">
              {skillBreakdown.toLearn}
            </div>
            <div className="text-lg font-medium text-gray-900 mb-2">
              Skills to Learn
            </div>
            <div className="text-sm text-gray-500">
              Additional skills to reach your goal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
