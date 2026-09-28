export interface SkillItem {
  name: string;
  category: 'programming' | 'ai_ml' | 'data' | 'web' | 'backend' | 'tools';
  level: 'Core' | 'Applied' | 'Current Learning';
  highlight?: boolean;
}

export interface ProjectData {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  category: string;
}

export const PERSONAL_INFO = {
  name: "Sri Vidhya A",
  headline: "AI & Data Science Engineer | Generative AI Enthusiast | Developer",
  summary: "I build intelligent applications by combining software development, machine learning, and emerging Generative AI technologies.",
  location: "Chennai, Tamil Nadu, India",
  phone: "+91 9363822355",
  email: "srividhya2108@gmail.com",
  linkedin: "https://www.linkedin.com/in/sri-vidhya-a-840901382/",
  github: "https://github.com/srividhya-codee",
  leetcode: "https://leetcode.com/u/Srividhya__2108/",
  education: {
    degree: "B.Tech Artificial Intelligence and Data Science",
    college: "Easwari Engineering College",
    year: "2nd Year – 3rd Semester",
    gradYear: "2029",
    cgpa: "8.77 / 10",
    twelfthScore: "93.7%"
  },
  careerGoal: "Generative AI Engineer / AI-ML Engineer",
  availability: "Looking for AI/ML and Generative AI internships (Onsite & Remote)"
};

export const ABOUT_TEXT = `I am a second-year B.Tech Artificial Intelligence and Data Science student at Easwari Engineering College with a CGPA of 8.77. I am passionate about Generative AI, Artificial Intelligence, Machine Learning, and software development.

I enjoy building practical technology solutions that solve real-world problems. My projects include smart parking, government project monitoring, machine learning risk prediction, RAG-based information retrieval, and AI-powered decision-support systems.

I am currently looking for internship opportunities where I can learn, contribute, and work on real-world AI/ML and Generative AI applications.`;

export const PROFILE_HIGHLIGHTS = [
  { metric: "8.77 CGPA", label: "Academic Excellence", desc: "Easwari Engineering College" },
  { metric: "AI & Data Science", label: "Specialized Degree", desc: "Core & applied computational curriculum" },
  { metric: "Generative AI", label: "RAG & LangGraph", desc: "Agentic pipelines & prompt systems" },
  { metric: "AI/ML", label: "Predictive Models", desc: "XGBoost, Gradient Boosting & SHAP" },
  { metric: "Problem Solver", label: "Practical Solutions", desc: "Translating concepts into working software" },
  { metric: "Hackathon Participant", label: "Innovation Unbound", desc: "Shortlisted for Round 2" },
];

export const SKILLS_LIST: SkillItem[] = [
  // Programming
  { name: "Python", category: "programming", level: "Core", highlight: true },
  { name: "C", category: "programming", level: "Applied" },
  { name: "C++", category: "programming", level: "Applied" },
  { name: "Java", category: "programming", level: "Applied" },

  // AI / Machine Learning
  { name: "Artificial Intelligence", category: "ai_ml", level: "Core", highlight: true },
  { name: "Machine Learning", category: "ai_ml", level: "Core", highlight: true },
  { name: "Generative AI", category: "ai_ml", level: "Current Learning", highlight: true },
  { name: "XGBoost", category: "ai_ml", level: "Applied", highlight: true },
  { name: "Gradient Boosting", category: "ai_ml", level: "Applied" },
  { name: "SHAP", category: "ai_ml", level: "Applied" },
  { name: "RAG", category: "ai_ml", level: "Current Learning", highlight: true },
  { name: "LangGraph", category: "ai_ml", level: "Current Learning", highlight: true },

  // Data
  { name: "Pandas", category: "data", level: "Core", highlight: true },

  // Web Development
  { name: "TypeScript", category: "web", level: "Applied", highlight: true },
  { name: "HTML", category: "web", level: "Core" },
  { name: "CSS", category: "web", level: "Core" },

  // Backend / Database
  { name: "Django", category: "backend", level: "Applied", highlight: true },
  { name: "Redis", category: "backend", level: "Current Learning" },

  // Developer Tools
  { name: "Git", category: "tools", level: "Core" },
  { name: "GitHub", category: "tools", level: "Core" },
  { name: "VS Code", category: "tools", level: "Core" },
  { name: "Jupyter", category: "tools", level: "Core" },
  { name: "Google AI Studio", category: "tools", level: "Applied" },
  { name: "Render", category: "tools", level: "Applied" }
];

export const SOFT_SKILLS = [
  "Communication",
  "Teamwork",
  "Leadership",
  "Problem Solving",
  "Presentation",
  "Public Speaking",
  "Time Management",
  "Fast Learning",
  "Creative Thinking"
];

export const LANGUAGES = [
  { name: "Tamil", proficiency: "Fluent", type: "Native / Bilingual" },
  { name: "English", proficiency: "Fluent", type: "Professional Working" },
  { name: "Kannada", proficiency: "Speaking", type: "Conversational" }
];

export const ACHIEVEMENTS = [
  {
    event: "Innovation Unbound",
    type: "Hackathon",
    status: "Shortlisted for Round 2",
    description: "Evaluated and selected among competitive technical teams for an innovative technological solution addressing real-world problem statements."
  }
];

export const CODING_PROFILES = [
  {
    platform: "GitHub",
    handle: "srividhya-codee",
    url: "https://github.com/srividhya-codee",
    description: "Repositories, open source contributions, smart parking system, and AI monitoring engines.",
    primaryTag: "Repositories & Code"
  },
  {
    platform: "LeetCode",
    handle: "Srividhya__2108",
    url: "https://leetcode.com/u/Srividhya__2108/",
    description: "Data structures, algorithmic problem solving, time complexity optimization in Python and C++.",
    primaryTag: "Algorithm Practice"
  },
  {
    platform: "LinkedIn",
    handle: "Sri Vidhya A",
    url: "https://www.linkedin.com/in/sri-vidhya-a-840901382/",
    description: "Professional networking, academic milestones, and engineering journey in AI & Data Science.",
    primaryTag: "Professional Network"
  }
];

export const PROJECTS: ProjectData[] = [
  {
    id: "smart-park",
    name: "Smart_Park – Smart Parking Management System",
    subtitle: "Real-Time Urban Parking Space Discovery & Management",
    description: "A smart parking management application designed to help users discover and manage available parking spaces.",
    problemSolved: "Urban drivers waste significant fuel and time looking for available parking slots in congested sectors. Smart_Park bridges the information gap with real-time slot state tracking and streamlined booking.",
    technologies: ["TypeScript", "Frontend Architecture", "State Management", "Location Services"],
    features: [
      "Parking availability tracking with real-time status indicators",
      "Parking search with fast query filtering",
      "Location-based functionality for nearby facility discovery",
      "User authentication for secure profile and booking management",
      "Parking reservation with instant confirmation",
      "User and admin functionality for operator monitoring",
      "Modern full-stack architecture"
    ],
    githubUrl: "https://github.com/srividhya-codee/Smart_Park",
    category: "Full-Stack System"
  },
  {
    id: "bharat-intelligence",
    name: "Bharat Project Intelligence (भारत परियोजना प्रज्ञा)",
    subtitle: "AI-Powered Integrated Government Project Monitoring & Decision Support Platform",
    description: "An AI-powered project monitoring and decision-support prototype designed for government infrastructure project management and Smart India Hackathon.",
    problemSolved: "Infrastructure mega-projects historically face massive cost overruns and multi-year delays without transparent predictive warnings. This platform unifies Earned Value Management, machine learning risk forecasting, and citation-backed generative AI agents for decision makers.",
    technologies: [
      "Python",
      "Machine Learning",
      "Gradient Boosting",
      "XGBoost",
      "SHAP",
      "Retrieval-Augmented Generation (RAG)",
      "LangGraph",
      "Django",
      "TypeScript",
      "RBAC",
      "Evidence-based AI responses"
    ],
    features: [
      "Authoritative EVM Analytics (SPI, CPI, EAC, and Financial-Physical lead gap analysis)",
      "Machine Learning Risk Engine predicting project delay duration and cost overrun %",
      "Gradient Boosting & XGBoost modeling with SHAP feature explainability",
      "Retrieval-Augmented Generation across site inspection notes, contractor filings, and statutory circulars",
      "LangGraph Agent with guardrailed state machine and role-based access control",
      "Numerical accuracy verification and verifiable evidence citations"
    ],
    githubUrl: "https://github.com/srividhya-codee/Project-Monitoring-system",
    category: "AI & Decision Support"
  }
];

export const PIPELINE_STEPS = [
  {
    id: "gov-data",
    step: "01",
    title: "Government Project Data",
    desc: "Ingestion of public sector infrastructure milestones, financial outlays, contractor monthly filings, and site inspection logs.",
    category: "Data Ingestion"
  },
  {
    id: "processing",
    step: "02",
    title: "Data Processing",
    desc: "Feature normalization, date differential alignment, missing metric imputation, and structural schema harmonization.",
    category: "ETL & Pipeline"
  },
  {
    id: "evm",
    step: "03",
    title: "EVM Analytics",
    desc: "Schedule Performance Index (SPI), Cost Performance Index (CPI), Estimate at Completion (EAC), and physical-financial gap checks.",
    category: "Earned Value Metrics"
  },
  {
    id: "risk-engine",
    step: "04",
    title: "ML Risk Engine",
    desc: "Multi-target forecasting predicting anticipated delay duration (in days) and estimated budget overrun percentage.",
    category: "Predictive Analytics"
  },
  {
    id: "boost-models",
    step: "05",
    title: "XGBoost + Gradient Boosting",
    desc: "Ensemble tree regressors trained on historical project parameters to capture non-linear contractor delay correlations.",
    category: "Ensemble Models"
  },
  {
    id: "shap",
    step: "06",
    title: "SHAP Explainability",
    desc: "Shapley Additive exPlanations attributing feature importance to prevent black-box decisions in government audits.",
    category: "Model Interpretability"
  },
  {
    id: "rag",
    step: "07",
    title: "RAG Knowledge Retrieval",
    desc: "Semantic vector retrieval across statutory circulars, contractor filings, and engineering inspection notes.",
    category: "Retrieval Augmented"
  },
  {
    id: "langgraph",
    step: "08",
    title: "LangGraph Agent",
    desc: "Guardrailed state-graph agent executing role-based access control, numerical sanity verification, and prompt routing.",
    category: "Agent Architecture"
  },
  {
    id: "decision",
    step: "09",
    title: "Decision Support",
    desc: "Auditable synthesis reports with evidence citations, actionable risk alerts, and mitigation recommendations for officials.",
    category: "Synthesis Output"
  }
];
