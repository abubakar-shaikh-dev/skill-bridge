import { useState, useEffect } from "react";
import { generateJobSuggestions } from "../utils/openrouterApi";
import jobRoles from "../data/jobRoles.json";

export default function SuggestedJobs({
  selectedSkills = [],
  selectedRole = null,
}) {
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRole && selectedSkills.length > 0) {
      fetchJobSuggestions();
    }
  }, [selectedRole, selectedSkills]);

  const fetchJobSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get the role label for display
      const roleData = jobRoles.find((role) => role.value === selectedRole);
      const roleLabel = roleData?.label || selectedRole;

      const suggestions = await generateJobSuggestions(
        roleLabel,
        selectedSkills
      );
      setJobSuggestions(suggestions);
    } catch (err) {
      console.error("Error fetching job suggestions:", err);
      setError("Failed to load job suggestions. Please try again.");
      // Fallback to static suggestions
      setJobSuggestions(getFallbackJobs());
    } finally {
      setLoading(false);
    }
  };

  // Fallback static jobs if API fails
  const getFallbackJobs = () => {
    const roleData = jobRoles.find((role) => role.value === selectedRole);
    const roleLabel = roleData?.label || selectedRole;

    return [
      {
        id: 1,
        title: `Senior ${roleLabel}`,
        company: "TechCorp",
        location: "San Francisco, CA",
        salaryRange: "$80,000 - $120,000",
        description:
          "Join our dynamic team and work on cutting-edge projects with modern technologies.",
        requiredSkills: selectedSkills.slice(0, 3),
        experienceLevel: "Senior",
        applyUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
          roleLabel
        )}`,
      },
      {
        id: 2,
        title: roleLabel,
        company: "InnovateSoft",
        location: "Remote",
        salaryRange: "$60,000 - $90,000",
        description:
          "Remote-first company seeking talented professionals to join our growing team.",
        requiredSkills: selectedSkills.slice(0, 3),
        experienceLevel: "Mid",
        applyUrl: `https://www.indeed.com/jobs?q=${encodeURIComponent(
          roleLabel
        )}`,
      },
      {
        id: 3,
        title: `Junior ${roleLabel}`,
        company: "StartupXYZ",
        location: "New York, NY",
        salaryRange: "$45,000 - $65,000",
        description:
          "Great opportunity for career growth in a fast-paced startup environment.",
        requiredSkills: selectedSkills.slice(0, 2),
        experienceLevel: "Entry",
        applyUrl: `https://www.glassdoor.com/Jobs/${encodeURIComponent(
          roleLabel
        )}-jobs-SRCH_KO0,${roleLabel.length}.htm`,
      },
    ];
  };

  const handleApplyClick = (job) => {
    // Open job application in new tab
    window.open(job.applyUrl, "_blank", "noopener,noreferrer");
  };

  const getExperienceLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "entry":
        return "bg-green-100 text-green-800";
      case "mid":
        return "bg-blue-100 text-blue-800";
      case "senior":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Suggested Job Opportunities
          </h2>
          <p className="text-lg text-gray-600">
            Discover job openings that match your skills and career goals
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">
              Finding the best job opportunities for you...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchJobSuggestions}
                className="mt-2 text-red-700 hover:text-red-900 font-medium underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && jobSuggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobSuggestions.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-purple-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExperienceLevelColor(
                      job.experienceLevel
                    )}`}
                  >
                    {job.experienceLevel}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {job.salaryRange}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>

                <div className="mb-3">
                  <p className="text-purple-600 font-medium">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>

                {job.requiredSkills && job.requiredSkills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Key Skills:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.requiredSkills.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                          +{job.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Apply Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && jobSuggestions.length === 0 && selectedRole && (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                No job suggestions available yet.
              </p>
              <button
                onClick={fetchJobSuggestions}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Load Job Suggestions
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
