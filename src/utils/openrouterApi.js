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
