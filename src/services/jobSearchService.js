const API_BASE_URL = "https://api.theirstack.com/v1";

export const searchJobs = async (jobTitle, skills = [], limit = 10) => {
  try {
    const requestBody = {
      include_total_results: false,
      order_by: [
        {
          desc: true,
          field: "date_posted",
        },
      ],
      posted_at_max_age_days: 15,
      job_country_code_or: ["IN"],
      job_title_or: [jobTitle.toUpperCase()],
      page: 0,
      limit: limit,
      blur_company_data: false,
    };

    const response = await fetch(`${API_BASE_URL}/jobs/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_THEIR_STACK_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return transformJobResults(data.data || [], skills);
  } catch (error) {
    console.error("Error searching jobs:", error);
    throw error;
  }
};

const transformJobResults = (apiResults, userSkills) => {
  return apiResults.map((job, index) => ({
    id: job.id || index + 1,
    title: job.job_title || "Job Title Not Available",
    company: job.company || "Company Not Disclosed",
    location: formatLocation(job),
    salaryRange: formatSalary(job),
    description: job.description || "No description available",
    requiredSkills: extractSkills(job, userSkills),
    experienceLevel: determineExperienceLevel(job),
    applyUrl: job.url || "#",
    datePosted: job.date_posted,
    jobType: job.employment_statuses?.[0] || "full_time",
    remote: job.remote || false,
  }));
};

const formatLocation = (job) => {
  // Use the formatted location if available, otherwise build from parts
  if (job.location) {
    return job.remote ? `${job.location} (Remote Available)` : job.location;
  }

  const parts = [];
  if (job.short_location) {
    return job.remote
      ? `${job.short_location} (Remote Available)`
      : job.short_location;
  }

  if (job.country) parts.push(job.country);

  if (parts.length === 0) {
    return job.remote ? "Remote" : "Location Not Specified";
  }

  const location = parts.join(", ");
  return job.remote ? `${location} (Remote Available)` : location;
};

const formatSalary = (job) => {
  // Check if salary_string is available first
  if (job.salary_string) {
    return job.salary_string;
  }

  if (job.min_annual_salary && job.max_annual_salary) {
    const currency = job.salary_currency || "USD";
    const min = formatSalaryAmount(job.min_annual_salary, currency);
    const max = formatSalaryAmount(job.max_annual_salary, currency);
    return `${min} - ${max}`;
  }

  if (job.min_annual_salary) {
    const currency = job.salary_currency || "USD";
    return `From ${formatSalaryAmount(job.min_annual_salary, currency)}`;
  }

  return "Salary Not Disclosed";
};

const formatSalaryAmount = (amount, currency) => {
  if (currency === "INR") {
    // Format Indian Rupees
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  if (currency === "USD") {
    // Format US Dollars
    if (amount >= 1000) {
      return `$${amount / 1000}K`;
    }
    return `$${amount.toLocaleString()}`;
  }

  // Default formatting
  return `${currency} ${amount.toLocaleString()}`;
};

const extractSkills = (job, userSkills) => {
  // First, try to use technology_slugs from the API
  if (job.technology_slugs && job.technology_slugs.length > 0) {
    const techSkills = job.technology_slugs
      .map((slug) => {
        // Convert slug to readable format
        return slug
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      })
      .slice(0, 5);

    if (techSkills.length > 0) {
      return techSkills;
    }
  }

  const jobText = `${job.job_title || ""} ${
    job.description || ""
  }`.toLowerCase();

  // Find matching skills from user's selected skills
  const matchingSkills = userSkills.filter((skill) =>
    jobText.includes(skill.toLowerCase())
  );

  // If we found matching skills, return them
  if (matchingSkills.length > 0) {
    return matchingSkills.slice(0, 5); // Limit to 5 skills
  }

  // Otherwise, try to extract common tech skills from the job description
  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "Angular",
    "Vue.js",
    "HTML",
    "CSS",
    "SQL",
    "AWS",
    "Docker",
    "Git",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Redux",
    "Express",
    "Spring",
    "Django",
    "Flask",
    "REST API",
    "GraphQL",
    "Kubernetes",
    "Jenkins",
    "CI/CD",
    "Agile",
    "Scrum",
  ];

  const foundSkills = commonSkills.filter((skill) =>
    jobText.includes(skill.toLowerCase())
  );

  return foundSkills.slice(0, 3); // Limit to 3 extracted skills
};

const determineExperienceLevel = (job) => {
  // Use the seniority field from API if available
  if (job.seniority) {
    switch (job.seniority.toLowerCase()) {
      case "senior":
        return "Senior";
      case "junior":
      case "entry_level":
        return "Entry";
      case "mid_level":
      case "mid":
        return "Mid";
      default:
        break;
    }
  }

  // Fallback to text analysis
  const jobText = `${job.job_title || ""} ${
    job.description || ""
  }`.toLowerCase();

  if (
    jobText.includes("senior") ||
    jobText.includes("lead") ||
    jobText.includes("principal") ||
    jobText.includes("architect") ||
    jobText.includes("staff")
  ) {
    return "Senior";
  }

  if (
    jobText.includes("junior") ||
    jobText.includes("entry") ||
    jobText.includes("graduate") ||
    jobText.includes("intern") ||
    jobText.includes("trainee")
  ) {
    return "Entry";
  }

  if (jobText.includes("mid") || jobText.includes("intermediate")) {
    return "Mid";
  }

  // Default to Mid if we can't determine
  return "Mid";
};
