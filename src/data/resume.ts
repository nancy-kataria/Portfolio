export const profile = {
  name: "Nancy Kataria",
  role: "Software Engineer",
  location: "San Jose, CA",
  email: "katarianancy8@gmail.com",
  tagline: "Full-stack engineer building AI-powered, human-friendly software.",
  github: "https://github.com/nancy-kataria",
  linkedin: "https://www.linkedin.com/in/nancy-kataria8/",
  resume:
    "https://drive.google.com/file/d/19CE2xHMvxnkJ7DOvu6kBxK8Ed_B6pXVc/view",
};

export const projects = [
  {
    name: "Bull v. Bear",
    blurb: "AI-powered Investment research platform",
    stack: [
      "Typescript",
      "Next.js",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "AI-SDK",
      "OpenAI",
      "Vitest",
      "OAuth",
    ],
    link: "https://github.com/nancy-kataria/Bull-v-Bear",
  },
  {
    name: "Code Intelligence",
    blurb: "RAG app that answers questions about any GitHub repo.",
    stack: [
      "Next.js",
      "TypeScript",
      "Langchain",
      "Pinecone",
      "Zod",
      "OpenAI GPT-4",
      "Vercel",
    ],
    link: "https://github.com/nancy-kataria/codebase-intelligence",
  },
  {
    name: "Digital Lawyer",
    blurb: "Offline-first AI legal assistant running fully on-device.",
    stack: ["Next.js", "Ollama", "Gemma3", "Llava", "Web Speech API"],
    link: "https://github.com/nancy-kataria/Digital_Lawyer",
  },
  {
    name: "Parking Violations Checker",
    blurb: "Prolog expert system that infers campus parking violations.",
    stack: ["Prolog", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/nancy-kataria/Parking-Violations-Checker",
  },
];

export const experience = [
  {
    company: "i3 Digital Health",
    role: "Software Engineer",
    period: "Jan 2023 — Nov 2023",
    location: "Bangalore, India",
    points: [
      "Developed a doctor-faced portal in React, reducing report-analysis friction between multiple oncologists and served 100+ users.",
      "Secured Patient Data with JWT-based authentication and role-based access control across platform.",
      "Reduced redundant data fetches by 40% by client side caching with React Query, ensuring near-instant page reloads.",
      "Automated deployment workflows via CI/CD pipelines to an Amazon EC2 instance, cutting deployment downtime and implementing test coverage.",
      "Streamlined workplace task management by building a full-stack Payroll and Time Log System, utilizing MongoDB and Express.js for secure backend data management and React for UI.",
    ],
  },
];

export const education = [
  {
    school: "California State University - Fullerton, United States",
    degree: "M.S. Computer Science",
    period: "Jan 2024 — Jan 2026",
    detail: "GPA 3.68",
  },
  {
    school: "Panjab University, India",
    degree: "B.E. Computer Science",
    period: "Aug 2019 — May 2023",
    detail: "CGPA 3.32",
  },
];

export const skills = {
  Languages: [
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "Prolog",
    "HTML",
    "CSS",
    "JSON",
  ],
  "Frameworks & Libraries": [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Deno",
    "Tailwind CSS",
    "Zod",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "PyTorch",
    "LangChain",
  ],
  "Databases & Backends": [
    "PostgreSQL",
    "pgvector",
    "MySQL",
    "MongoDB",
    "Supabase",
    "Pinecone",
    "Prisma",
  ],
  "Tools & DevOps": [
    "Git",
    "GitHub",
    "GitHub Actions",
    "CI/CD",
    "Postman",
    "Vitest",
  ],
};

export const flatSkills = Object.values(skills).flat();
