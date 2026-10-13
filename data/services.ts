import { site } from "./site";

export type Service = {
  title: string;
  tag: string;
  description: string;
  path: string;
  features: string[];
};

export const services: Service[] = [
  {
    title: "AI-Powered Applications",
    tag: "AI",
    description:
      "LLM features, voice AI, and RAG systems built into real products — from voice-driven medical consultations to AI-generated daily learning content. Not AI for the sake of AI — AI that solves a real problem.",
    path: "Scope → Prototype → Production",
    features: ["LLM integration (OpenRouter, Gemini)", "Voice AI (VAPI)", "Retrieval-Augmented Generation", "Prompt engineering"],
  },
  {
    title: "Full-Stack Web Apps",
    tag: "Web app",
    description:
      "Responsive, production-ready web applications with typed APIs, secure authentication, and well-designed databases — deployed on Vercel and ready for real users.",
    path: "Scope → Prototype → Production",
    features: ["Next.js & React.js", "Node.js, Express.js & FastAPI", "Auth & role-based access", "PostgreSQL + Drizzle ORM"],
  },
  {
    title: "Machine Learning & Vision",
    tag: "ML",
    description:
      "Models trained, evaluated, and served — from food image classification with NextViT to speech recognition with Whisper and Wav2Vec2, with custom datasets where none exist.",
    path: "Data → Model → Deployment",
    features: ["PyTorch & HuggingFace Transformers", "Computer vision", "Speech recognition (ASR)", "LLM/SLM fine-tuning"],
  },
  {
    title: "Data & Analytics",
    tag: "Data",
    description:
      "Clean pipelines from messy, real-world data to predictions and insights you can act on — with algorithms compared honestly before one is chosen.",
    path: "Data → Model → Insight",
    features: ["Pandas & NumPy", "Feature engineering", "Scikit-learn & XGBoost", "Matplotlib & Seaborn"],
  },
];

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  items: string[];
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Understand & plan",
    description:
      "Learn the problem, ask the uncomfortable questions, and set up the foundation — requirements, data model, and a clear plan.",
    items: ["Understanding the goals", "Database design", "Auth & environment", "Sprint planning"],
  },
  {
    step: 2,
    title: "Build",
    description: "Core features, API endpoints, and AI integrations — with progress you can see and give feedback on as it happens.",
    items: ["API development", "Frontend build", "AI/ML integration", "Core features"],
  },
  {
    step: 3,
    title: "Test & refine",
    description: "Good enough isn't good enough. Test, refine, and polish until it feels solid on every device and edge case.",
    items: ["Jest unit & integration tests", "Bug fixes", "Performance tuning", "Responsive polish"],
  },
  {
    step: 4,
    title: "Ship & document",
    description: "Deploy to production, document the code, and make sure the next developer can take it from there.",
    items: ["Vercel deployment", "JSDoc documentation", "Handover", "Retrospective"],
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "C/C++", "PHP", "Java"] },
  { label: "Web", items: ["Next.js", "React.js", "Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"] },
  {
    label: "AI & ML",
    items: [
      "PyTorch",
      "Scikit-learn",
      "HuggingFace Transformers",
      "LangChain",
      "LlamaIndex",
      "Ollama",
      "RAG",
      "LLM/SLM Fine-tuning",
      "Prompt Engineering",
      "Computer Vision",
      "NLP",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Database Design", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Feature Engineering"],
  },
  { label: "Ship it", items: ["Git", "GitHub", "Docker", "Vercel", "Jest", "JSDoc", "Trello", "Agile/Scrum", "Technical Writing"] },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What kind of roles are you looking for?",
    answer:
      "AI engineering roles — with a particular interest in real-time conversational AI, efficient model deployment, and real-world applications of large language models.",
  },
  {
    question: "What are you working on right now?",
    answer:
      "I'm an AI Research Engineer at Robot Bulls, building a real-time Talking Head system: low-latency streaming pipelines for natural speech-to-speech interaction, with conversational LLMs and synchronized facial animation for a responsive AI avatar.",
  },
  {
    question: "Do you work across the whole stack?",
    answer:
      "Yes — from training and evaluating models in PyTorch to building the Next.js frontend, the API, and the PostgreSQL data layer, and deploying it all on Vercel.",
  },
  {
    question: "Can I see the code?",
    answer:
      "Yes. Every project in the archive links to its repository on GitHub, most have a live demo you can try, and each one has a case study covering the challenges and how I solved them.",
  },
  {
    question: "What's your educational background?",
    answer:
      "A Bachelor of Science in Computer Science and Engineering from North South University (Sep 2021 – Dec 2025), with a CGPA of 3.83/4.00 and a Merit Scholarship for ranking in the top 1% of my class.",
  },
  {
    question: "Where are you based?",
    answer: `${site.address} (${site.timeZoneLabel}).`,
  },
];
