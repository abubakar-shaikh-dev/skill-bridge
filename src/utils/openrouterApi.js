import axios from "axios";

// OpenRouter API configuration
const API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY ||
  "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";

const API_BASE_URL = "https://openrouter.ai/api/v1";

const defaultHeaders = {
  Authorization: `Bearer ${API_KEY}`,
  "HTTP-Referer": import.meta.env.VITE_SITE_URL || "http://localhost:5173", // Site URL for rankings
  "X-Title": import.meta.env.VITE_SITE_NAME || "Skill Gap Analysis App", // Site title for rankings
  "Content-Type": "application/json",
};

/**
 * Generate a learning roadmap using OpenRouter AI
 * @param {string} role - The target job role
 * @param {Array} currentSkills - Array of current skills the user has
 * @param {Array} requiredSkills - Array of skills required for the role
 * @param {Array} missingSkills - Array of skills the user needs to learn
 * @returns {Promise<Array>} - Array of roadmap steps
 */
export async function generateAIRoadmap(
  role,
  currentSkills,
  requiredSkills,
  missingSkills
) {
  try {
    const prompt = `
You are a career development expert creating a personalized learning roadmap.

Target Role: ${role}
Current Skills: ${currentSkills.join(", ")}
Required Skills for Role: ${requiredSkills.join(", ")}
Skills to Learn: ${missingSkills.join(", ")}

Create a step-by-step learning roadmap for the missing skills. For each step, provide:
1. A clear, specific learning objective
2. Resource type (either "VIDEO" or "SITE")
3. Estimated learning time
4. Brief description of what they'll learn

Format your response as a JSON array with exactly this structure:
[
  {
    "id": 1,
    "skillName": "Specific learning objective",
    "type": "VIDEO" or "SITE",
    "description": "Brief description",
    "estimatedTime": "2-3 weeks",
    "difficulty": "Beginner/Intermediate/Advanced"
  }
]

Make sure to:
- Order steps logically (prerequisites first)
- Limit to 6-8 steps maximum
- Be specific about what they'll learn
- Consider the user's existing skills
- Focus on practical, actionable learning objectives

Respond with only the JSON array, no additional text.
`;

    const response = await axios.post(
      `${API_BASE_URL}/chat/completions`,
      {
        model: "x-ai/grok-4-fast:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: defaultHeaders,
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // Parse the JSON response
    const roadmapSteps = JSON.parse(aiResponse);

    // Validate and sanitize the response
    return roadmapSteps.map((step, index) => ({
      id: index + 1,
      skillName:
        step.skillName || `Learn ${missingSkills[index] || "New Skill"}`,
      type: step.type === "VIDEO" || step.type === "SITE" ? step.type : "SITE",
      description: step.description || "Complete this learning objective",
      estimatedTime: step.estimatedTime || "1-2 weeks",
      difficulty: step.difficulty || "Intermediate",
      link: `https://www.google.com/search?q=${encodeURIComponent(
        step.skillName + " tutorial"
      )}`,
    }));
  } catch (error) {
    console.error("Error generating AI roadmap:", error);

    // Fallback: Return a basic roadmap for missing skills
    return missingSkills.slice(0, 6).map((skill, index) => ({
      id: index + 1,
      skillName: `Learn ${skill.charAt(0).toUpperCase() + skill.slice(1)}`,
      type: index % 2 === 0 ? "VIDEO" : "SITE",
      description: `Master the fundamentals of ${skill}`,
      estimatedTime: "2-3 weeks",
      difficulty: "Intermediate",
      link: `https://www.google.com/search?q=${encodeURIComponent(
        skill + " tutorial"
      )}`,
    }));
  }
}

/**
 * Generate job suggestions using OpenRouter AI (India-focused with INR)
 * @param {string} role - The target job role
 * @param {Array} currentSkills - Array of current skills the user has
 * @returns {Promise<Array>} - Array of job opportunities in India with INR salaries
 */
export async function generateJobSuggestions(role, currentSkills) {
  try {
    const prompt = `
You are a job search expert helping users find relevant job opportunities in India.

Target Role: ${role}
User's Skills: ${currentSkills.join(", ")}

Generate 6 relevant job opportunities in India that match the user's profile. For each job, provide:
1. Job title
2. Indian company name (use realistic Indian company names like TCS, Infosys, Wipro, Zomato, Flipkart, Paytm, etc.)
3. Location (major Indian cities like Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chennai, etc.)
4. Salary range in INR (realistic for Indian market)
5. Brief job description
6. Key skills required
7. Experience level required

Format your response as a JSON array with exactly this structure:
[
  {
    "id": 1,
    "title": "Job Title",
    "company": "Indian Company Name",
    "location": "Indian City, India",
    "salaryRange": "₹X,XX,XXX - ₹X,XX,XXX LPA",
    "description": "Brief 2-3 line job description",
    "requiredSkills": ["skill1", "skill2", "skill3"],
    "experienceLevel": "Entry/Mid/Senior",
    "applyUrl": "https://naukri.com/job/123 or https://linkedin.com/jobs/india/123"
  }
]

Salary Guidelines for India:
- Entry Level: ₹3,00,000 - ₹8,00,000 LPA
- Mid Level: ₹8,00,000 - ₹18,00,000 LPA  
- Senior Level: ₹18,00,000 - ₹40,00,000 LPA

Focus on:
- Real Indian companies (both startups and established firms)
- Major Indian tech hubs
- Competitive Indian salary ranges in INR
- Include both product companies and service companies
- Use Indian job portals like Naukri.com, LinkedIn India in apply URLs

Respond with only the JSON array, no additional text.
`;

    const response = await axios.post(
      `${API_BASE_URL}/chat/completions`,
      {
        model: "x-ai/grok-4-fast:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: defaultHeaders,
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // Parse the JSON response
    const jobSuggestions = JSON.parse(aiResponse);

    // Validate and sanitize the response
    return jobSuggestions.map((job, index) => ({
      id: index + 1,
      title: job.title || `${role} Position`,
      company: job.company || "TCS",
      location: job.location || "Bangalore, India",
      salaryRange: job.salaryRange || "₹6,00,000 - ₹12,00,000 LPA",
      description:
        job.description ||
        "Exciting opportunity to grow your career in India's tech ecosystem",
      requiredSkills: Array.isArray(job.requiredSkills)
        ? job.requiredSkills
        : [role],
      experienceLevel: job.experienceLevel || "Mid",
      applyUrl:
        job.applyUrl ||
        `https://www.naukri.com/jobs-in-india?k=${encodeURIComponent(
          job.title || role
        )}`,
    }));
  } catch (error) {
    console.error("Error generating job suggestions:", error);

    // Fallback: Return Indian job suggestions with INR
    return [
      {
        id: 1,
        title: `Senior ${role}`,
        company: "Tata Consultancy Services (TCS)",
        location: "Bangalore, India",
        salaryRange: "₹18,00,000 - ₹28,00,000 LPA",
        description:
          "Join India's largest IT services company and work on global projects with cutting-edge technology",
        requiredSkills: currentSkills.slice(0, 3),
        experienceLevel: "Senior",
        applyUrl: `https://www.naukri.com/jobs-in-india?k=${encodeURIComponent(
          role
        )}`,
      },
      {
        id: 2,
        title: `${role}`,
        company: "Flipkart",
        location: "Bangalore, India",
        salaryRange: "₹12,00,000 - ₹20,00,000 LPA",
        description:
          "Be part of India's leading e-commerce platform and shape the future of online shopping",
        requiredSkills: currentSkills.slice(0, 3),
        experienceLevel: "Mid",
        applyUrl: `https://www.linkedin.com/jobs/search/?currentJobId=&geoId=102713980&keywords=${encodeURIComponent(
          role
        )}&location=India`,
      },
      {
        id: 3,
        title: `Junior ${role}`,
        company: "Zomato",
        location: "Gurgaon, India",
        salaryRange: "₹6,00,000 - ₹10,00,000 LPA",
        description:
          "Start your career with India's leading food delivery platform and grow in a dynamic startup environment",
        requiredSkills: currentSkills.slice(0, 2),
        experienceLevel: "Entry",
        applyUrl: `https://www.naukri.com/zomato-jobs?k=${encodeURIComponent(
          role
        )}`,
      },
      {
        id: 4,
        title: `${role} - Remote`,
        company: "Paytm",
        location: "Noida, India (Remote Available)",
        salaryRange: "₹10,00,000 - ₹16,00,000 LPA",
        description:
          "Join India's digital payments revolution and work on fintech solutions used by millions",
        requiredSkills: currentSkills.slice(0, 3),
        experienceLevel: "Mid",
        applyUrl: `https://careers.paytm.com/jobs?search=${encodeURIComponent(
          role
        )}`,
      },
      {
        id: 5,
        title: `Lead ${role}`,
        company: "Infosys",
        location: "Hyderabad, India",
        salaryRange: "₹22,00,000 - ₹32,00,000 LPA",
        description:
          "Lead innovative projects at one of India's premier IT services companies with global reach",
        requiredSkills: currentSkills.slice(0, 4),
        experienceLevel: "Senior",
        applyUrl: `https://www.infosys.com/careers/job-search.html?search=${encodeURIComponent(
          role
        )}`,
      },
      {
        id: 6,
        title: `${role} Intern`,
        company: "BYJU'S",
        location: "Bangalore, India",
        salaryRange: "₹4,00,000 - ₹7,00,000 LPA",
        description:
          "Begin your journey in EdTech with India's leading online learning platform",
        requiredSkills: currentSkills.slice(0, 2),
        experienceLevel: "Entry",
        applyUrl: `https://byjus.com/careers/?search=${encodeURIComponent(
          role
        )}`,
      },
    ];
  }
}

/**
 * Test the OpenRouter API connection
 * @returns {Promise<boolean>} - Whether the API is working
 */
export async function testApiConnection() {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/chat/completions`,
      {
        model: "x-ai/grok-4-fast:free",
        messages: [
          {
            role: "user",
            content: "Hello, please respond with just 'API Working'",
          },
        ],
        max_tokens: 10,
      },
      {
        headers: defaultHeaders,
      }
    );

    return response.data.choices[0].message.content.includes("API Working");
  } catch (error) {
    console.error("API connection test failed:", error);
    return false;
  }
}
