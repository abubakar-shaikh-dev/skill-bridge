import { generateAIRoadmap } from "../utils/openrouterApi.js";
import { jobRoleSkills } from "../data/jobRoleSkills.js";

// Skill name mapping for display
const skillDisplayNames = {
  javascript: "JavaScript Fundamentals",
  typescript: "TypeScript",
  react: "React Framework",
  nodejs: "Node.js & Express",
  python: "Python Programming",
  java: "Java Development",
  sql: "Database Design & SQL",
  mongodb: "MongoDB & NoSQL",
  "rest-api": "REST API Development",
  git: "Git Version Control",
  aws: "AWS Cloud Platform",
  docker: "Docker Containerization",
  kubernetes: "Kubernetes Orchestration",
  "machine-learning": "Machine Learning Concepts",
  "data-analysis": "Data Analysis & Visualization",
  tensorflow: "TensorFlow Framework",
  pytorch: "PyTorch Framework",
  figma: "Figma Design Tool",
  "adobe-creative-suite": "Adobe Creative Suite",
  agile: "Agile/Scrum Methodology",
  html: "HTML & Semantic Markup",
  css: "CSS & Responsive Design",
};

export async function generatePersonalizedRoadmap(
  selectedSkills = [],
  selectedRole = null
) {
  if (!selectedRole || !jobRoleSkills[selectedRole]) {
    return {
      success: false,
      error: "Invalid or missing job role",
      roadmap: [],
      metadata: {
        totalSteps: 0,
        estimatedTime: "0 weeks",
        completionStatus: "No role selected",
      },
    };
  }

  try {
    const requiredSkills = jobRoleSkills[selectedRole];
    const missingSkills = requiredSkills.filter(
      (skill) => !selectedSkills.includes(skill)
    );

    // If no missing skills, user is ready
    if (missingSkills.length === 0) {
      return {
        success: true,
        roadmap: [],
        metadata: {
          totalSteps: 0,
          estimatedTime: "0 weeks",
          completionStatus: "complete",
          message: "You already have all the essential skills for this role!",
        },
      };
    }

    // Convert skill IDs to display names for better AI context
    const currentSkillNames = selectedSkills.map(
      (skill) => skillDisplayNames[skill] || skill
    );
    const requiredSkillNames = requiredSkills.map(
      (skill) => skillDisplayNames[skill] || skill
    );
    const missingSkillNames = missingSkills.map(
      (skill) => skillDisplayNames[skill] || skill
    );

    // Generate AI-powered roadmap
    const aiRoadmap = await generateAIRoadmap(
      selectedRole.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      currentSkillNames,
      requiredSkillNames,
      missingSkillNames
    );

    // Calculate metadata
    const totalWeeks = aiRoadmap.reduce((total, step) => {
      const timeMatch = step.estimatedTime.match(/(\d+)-?(\d+)?/);
      const avgWeeks = timeMatch
        ? (parseInt(timeMatch[1]) +
            (parseInt(timeMatch[2]) || parseInt(timeMatch[1]))) /
          2
        : 2;
      return total + avgWeeks;
    }, 0);

    return {
      success: true,
      roadmap: aiRoadmap,
      metadata: {
        totalSteps: aiRoadmap.length,
        estimatedTime: `${Math.ceil(totalWeeks)} weeks`,
        completionStatus: "in-progress",
        skillsToLearn: missingSkills.length,
        currentSkills: selectedSkills.length,
        targetRole: selectedRole
          .replace("-", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      },
    };
  } catch (error) {
    console.error("Error generating personalized roadmap:", error);

    return {
      success: false,
      error: "Failed to generate roadmap. Please try again.",
      roadmap: [],
      metadata: {
        totalSteps: 0,
        estimatedTime: "0 weeks",
        completionStatus: "error",
      },
    };
  }
}

export function getRoleInfo(role) {
  return {
    name: role
      ? role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Unknown Role",
    requiredSkills: jobRoleSkills[role] || [],
    requiredSkillsDisplay: (jobRoleSkills[role] || []).map(
      (skill) => skillDisplayNames[skill] || skill
    ),
  };
}
