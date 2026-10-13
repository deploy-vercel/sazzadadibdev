export type Project = {
  slug: string;
  /** Display name. Use "|" to mark a preferred line break (rendered as <wbr>). */
  name: string;
  /** Short name used in compact lists. */
  shortName: string;
  industry: string;
  /** One-liner used on the homepage rail. */
  tagline: string;
  /** Longer description used on /projects. */
  summary: string;
  /** Hint shown under the tagline when the panel hosts a live demo. */
  demoHint?: string;
  features: string[];
  /** Notable difficulties faced during development, paired by index with `solutions`. */
  challenges: string[];
  solutions: string[];
  /** Three headline technologies for the homepage. */
  stack: string[];
  /** Full tag list for the archive. */
  tags: string[];
  status: "live" | "source";
  statusLabel: string;
  liveUrl?: string;
  githubUrl: string;
  caseStudyHref?: string;
  /** Label shown in the faux browser chrome. */
  domain: string;
  image: string;
  imageAlt: string;
  featured: boolean;
};

const LIVE = "Live demo · deployed on Vercel";
const SOURCE = "Code on GitHub";

export const projects: Project[] = [
  {
    slug: "ai-doctor-assistant",
    name: "AI Doctor|Assistant",
    shortName: "AI Doctor Assistant",
    industry: "Voice AI · SaaS",
    tagline: "Voice-powered medical consultation platform with AI-driven healthcare assistance.",
    summary:
      "A comprehensive SaaS platform that revolutionizes medical consultations through AI-powered voice interactions, providing intelligent symptom analysis and automated report generation.",
    features: [
      "LLM-based symptom analysis for natural doctor-patient conversations",
      "Real-time speech understanding with VAPI Voice Assistant + OpenRouter AI",
      "Automatic medical report generation (symptoms, prescriptions, advice, summary)",
      "Clerk authentication for secure access",
      "Neon PostgreSQL + Drizzle ORM for robust data operations",
      "SaaS-ready architecture: dashboards, doctor listings, pricing, health tips",
      "Deployed on Vercel for global accessibility",
    ],
    challenges: [
      "Achieving natural, low-latency voice conversations that felt human rather than robotic",
      "Structuring unstructured doctor-patient dialogue into consistent, clinically useful reports",
      "Coordinating multiple services (voice, LLM, auth, database) into one cohesive real-time flow",
    ],
    solutions: [
      "Integrated VAPI Voice Assistant with OpenRouter AI for sub-second response times and natural turn-taking",
      "Designed prompt templates that reliably extract symptoms, prescriptions, and summaries from freeform conversation",
      "Used Clerk for auth and Drizzle ORM over Neon PostgreSQL to keep the data layer simple and type-safe end-to-end",
    ],
    stack: ["Next.js", "Voice AI", "PostgreSQL"],
    tags: ["Next.js", "TypeScript", "AI/LLM", "PostgreSQL", "Voice AI", "VAPI", "Clerk Auth", "Drizzle ORM", "SaaS"],
    status: "live",
    statusLabel: LIVE,
    liveUrl: "https://aidocassistant.vercel.app",
    githubUrl: "https://github.com/sazzadadib/AI-Doctor-Assistant",
    caseStudyHref: "/case-study/ai-doctor-assistant",
    domain: "aidocassistant.vercel.app",
    image: "/images/projects/ai-doctor-assistant.webp",
    imageAlt: "AI Doctor Assistant — voice-powered medical consultation platform",
    featured: true,
  },
  {
    slug: "deshiplate-ai",
    name: "DeshiPlate|AI",
    shortName: "DeshiPlate AI",
    industry: "Bangladeshi Food Recognition",
    tagline: "AI-powered food recognition system specialized in traditional Bangladeshi cuisine with nutrition assistance.",
    summary:
      "An intelligent food recognition platform leveraging deep learning to identify 33 traditional Bangladeshi dishes, providing instant nutritional insights and personalized health recommendations.",
    features: [
      "AI-powered recognition of 33 traditional Bangladeshi dishes",
      "Custom-curated dataset of Bangladeshi cuisine for model training",
      "NextViT deep learning architecture achieving 89.76% accuracy",
      "Real-time inference engine for instant food classification from images",
      "Personalized nutrition recommendations based on classified dishes",
      "Health suggestions tailored to identified food items",
      "Neon PostgreSQL + Drizzle ORM for scalable data operations",
      "Modern, responsive UI deployed on Vercel",
    ],
    challenges: [
      "No existing labeled dataset for Bangladeshi dishes, requiring data to be collected and curated from scratch",
      "Visually similar dishes (e.g., different curries) were hard to distinguish with a lightweight model",
      "Serving real-time inference without a heavy backend footprint",
    ],
    solutions: [
      "Curated and labeled a custom dataset of 33 traditional dishes covering diverse presentations",
      "Adopted the NextViT architecture, tuned for a strong accuracy/speed trade-off, reaching 89.76% accuracy",
      "Paired the classifier with a lightweight Next.js + PostgreSQL stack for instant nutrition lookups after inference",
    ],
    stack: ["NextViT", "PyTorch", "Next.js"],
    tags: ["Next.js", "TypeScript", "NextViT", "PyTorch", "Deep Learning", "PostgreSQL", "Drizzle ORM", "OpenRouter AI", "Computer Vision"],
    status: "live",
    statusLabel: LIVE,
    liveUrl: "https://deshiplateai.vercel.app",
    githubUrl: "https://github.com/sazzadadib/DeshiPlate-AI",
    caseStudyHref: "/case-study/deshiplate-ai",
    domain: "deshiplateai.vercel.app",
    image: "/images/projects/deshiplate-ai.webp",
    imageAlt: "DeshiPlate AI — Bangladeshi food recognition and nutrition assistant",
    featured: true,
  },
  {
    slug: "interviewbd",
    name: "Interview|BD",
    shortName: "InterviewBD",
    industry: "Interview Preparation Platform",
    tagline: "Community-driven platform for sharing and discovering real interview questions across various fields.",
    summary:
      "A comprehensive interview preparation ecosystem where professionals share authentic interview experiences, enabling job seekers to prepare effectively with field-specific questions, verified contributors, and collaborative learning features.",
    features: [
      "Hierarchical content organization with fields, categories, and a Q&A system",
      "Profile verification and badge system for credible contributors",
      "Real-time messaging with online status and activity tracking",
      "Three-tier role management: Admin, Moderator, and User permissions",
      "Advanced search, filtering, and like/bookmark functionality",
      "Comprehensive moderation tools with reporting and an analytics dashboard",
      "JWT authentication with email verification and PostgreSQL + Drizzle ORM",
      "Deployed on Vercel with a fully responsive design",
    ],
    challenges: [
      "Preventing low-quality or unverified content while keeping the platform open and community-driven",
      "Supporting real-time messaging and moderation at scale without over-engineering the stack",
      "Designing a permission model flexible enough for admins, moderators, and regular users",
    ],
    solutions: [
      "Built a profile verification and badge system so credible contributors stand out",
      "Implemented a three-tier role system (Admin/Moderator/User) with scoped moderation tools and analytics",
      "Used JWT auth with email verification, backed by PostgreSQL + Drizzle ORM, for a secure and simple data layer",
    ],
    stack: ["Next.js", "PostgreSQL", "Drizzle ORM"],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "JWT Auth", "Real-time Chat", "Nodemailer", "Tailwind CSS", "Vercel"],
    status: "live",
    statusLabel: LIVE,
    liveUrl: "https://interviewbd.vercel.app",
    githubUrl: "https://github.com/sazzadadib/InterviewBD-Platform",
    caseStudyHref: "/case-study/interviewbd",
    domain: "interviewbd.vercel.app",
    image: "/images/projects/interviewbd.webp",
    imageAlt: "InterviewBD — community-driven interview preparation platform",
    featured: true,
  },
  {
    slug: "english-learning-platform",
    name: "Daily English|Vocabulary",
    shortName: "Daily English Vocabulary",
    industry: "AI Vocabulary Learning",
    tagline: "AI-powered daily vocabulary testing platform with progress tracking and smart word management.",
    summary:
      "A comprehensive English learning platform that leverages Google Gemini AI to generate daily vocabulary tests, featuring intelligent progress tracking, sequential learning paths, and personalized word-saving capabilities for effective language mastery.",
    features: [
      "AI-generated daily vocabulary tests using Google Gemini 3.0 Flash",
      "Registration-date-based test access with sequential learning enforcement",
      "Comprehensive progress tracking with score history and analytics",
      "Save-word feature with full CRUD operations and search functionality",
      "Personal notes system for saved words with case-insensitive filtering",
      "JWT-based authentication with secure password hashing",
      "Automated daily test generation via Vercel Cron Jobs",
      "Neon PostgreSQL + Drizzle ORM for persistent data storage",
    ],
    challenges: [
      "Generating vocabulary tests that are consistently appropriate in difficulty and non-repetitive",
      "Enforcing a sequential learning path tied to each user's registration date without letting users skip ahead",
      "Automating daily content generation reliably without manual intervention",
    ],
    solutions: [
      "Used Google Gemini 3.0 Flash to generate fresh daily vocabulary tests on demand",
      "Gated test access by registration date so users progress through a personalized, sequential curriculum",
      "Automated test generation with Vercel Cron Jobs, backed by Neon PostgreSQL for durable progress tracking",
    ],
    stack: ["Next.js", "Gemini AI", "PostgreSQL"],
    tags: ["Next.js", "TypeScript", "Google Gemini AI", "PostgreSQL", "Drizzle ORM", "JWT Auth", "Tailwind CSS", "Vercel Cron"],
    status: "live",
    statusLabel: LIVE,
    liveUrl: "https://dailyengtest.vercel.app",
    githubUrl: "https://github.com/sazzadadib/Daily-Test",
    caseStudyHref: "/case-study/english-learning-platform",
    domain: "dailyengtest.vercel.app",
    image: "/images/projects/english-learning-platform.webp",
    imageAlt: "Daily English Vocabulary Platform — AI-generated daily vocabulary tests",
    featured: true,
  },
  {
    slug: "shobdotori",
    name: "SHOBDO|TORI",
    shortName: "SHOBDOTORI",
    industry: "Regional-to-Standard Bangla Speech Recognition",
    tagline: "ASR system to transcribe regional Bangladeshi dialects into standard Bangla.",
    summary:
      "Developed an Automatic Speech Recognition (ASR) platform that transcribes diverse regional Bangladeshi dialects into standard Bangla. Leveraging transformer-based speech models, phoneme alignment, audio augmentation, and n-gram post-processing, it achieves high transcription accuracy and competitive performance on benchmark evaluations.",
    features: [
      "Automatic transcription of 20 regional Bangladeshi dialects into standard Bangla",
      "Curated dataset with 3,800+ audio samples",
      "Transformer-based models: Whisper and Wav2Vec2",
      "Phoneme alignment and audio data augmentation for robust learning",
      "N-gram KenLM post-processing for fluent and linguistically correct transcriptions",
      "Performance evaluation using Normalized Levenshtein Similarity (NLS)",
      "AI Hackathon project under Televerse 1.0, CUET (Department of ETE)",
    ],
    challenges: [
      "Regional Bangla dialects have limited digitized speech data, making training data scarce",
      "Phoneme-level differences between dialects and standard Bangla caused frequent transcription errors",
      "Balancing transcription fluency with linguistic accuracy",
    ],
    solutions: [
      "Curated and augmented a dataset of 3,800+ audio samples across 20 regional dialects",
      "Fine-tuned Whisper and Wav2Vec2 with phoneme alignment for dialect-aware transcription",
      "Added an n-gram KenLM post-processing pass to smooth output into fluent, correct standard Bangla",
    ],
    stack: ["Whisper", "Wav2Vec2", "KenLM"],
    tags: ["Python", "PyTorch", "Whisper", "Wav2Vec2", "KenLM", "ASR", "Deep Learning", "Audio Processing"],
    status: "source",
    statusLabel: SOURCE,
    githubUrl: "https://github.com/sazzadadib/SHOBDOTORI",
    caseStudyHref: "/case-study/shobdotori",
    domain: "github.com/sazzadadib/SHOBDOTORI",
    image: "/images/projects/shobdotori.webp",
    imageAlt: "SHOBDOTORI — regional-to-standard Bangla speech recognition",
    featured: false,
  },
  {
    slug: "educational-chatbot",
    name: "Educational|Chatbot",
    shortName: "Educational Chatbot",
    industry: "Retrieval-Augmented Generation",
    tagline: "Lightweight SLM-based chatbot for offline, device-efficient educational assistance.",
    summary:
      "An innovative educational tool leveraging Small Language Models and RAG architecture to provide accessible learning support for underserved communities, with offline capability.",
    features: [
      "Lightweight SLM architecture for device-efficient operation",
      "Web-based interface for easy accessibility",
      "75% accuracy on a 4,000-question dataset validated with RAGChecker",
      "Offline capability for areas with limited internet connectivity",
      "Supports underserved communities in learning",
      "Retrieval-Augmented Generation for accurate responses",
    ],
    challenges: [
      "Running a capable chatbot on limited/offline hardware for underserved communities",
      "Keeping answers grounded and accurate despite using a small language model",
      "Validating answer quality without a large evaluation team",
    ],
    solutions: [
      "Chose a lightweight SLM architecture optimized for on-device, offline operation",
      "Used Retrieval-Augmented Generation to ground responses in a curated physics knowledge base",
      "Validated accuracy (75% on a 4,000-question set) using the RAGChecker framework",
    ],
    stack: ["RAG", "LangChain", "Ollama"],
    tags: ["Python", "RAG", "SLM", "LangChain", "Ollama", "Flask", "NLP"],
    status: "source",
    statusLabel: SOURCE,
    githubUrl: "https://github.com/CSE299-LLM-CHATBOT/physics_chat_bot",
    caseStudyHref: "/case-study/educational-chatbot",
    domain: "github.com/CSE299-LLM-CHATBOT",
    image: "/images/projects/educational-chatbot.webp",
    imageAlt: "Educational Chatbot — RAG-powered physics chatbot",
    featured: false,
  },
  {
    slug: "road-accident-analysis",
    name: "Road Accident|Analysis",
    shortName: "Road Accident Analysis",
    industry: "Machine Learning",
    tagline: "ML system for predicting patient status and injury severity from accident data.",
    summary:
      "A comprehensive machine learning pipeline for emergency response optimization, comparing multiple algorithms to achieve high accuracy in critical medical predictions.",
    features: [
      "Predictive models for patient status and injury type classification",
      "Comparative analysis: Logistic Regression, Decision Tree, SVM, XGBoost, Random Forest",
      "Achieved 99.1% accuracy for patient status prediction",
      "89% accuracy for injury type classification",
      "Data preprocessing and feature engineering pipeline",
      "Insights for improving emergency response strategies",
    ],
    challenges: [
      "Highly imbalanced classes between severe and minor injury outcomes skewed early models",
      "Choosing among several ML algorithms without overfitting to the training set",
      "Extracting meaningful features from messy, real-world accident report data",
    ],
    solutions: [
      "Built a thorough preprocessing and feature engineering pipeline before modeling",
      "Compared Logistic Regression, Decision Tree, SVM, XGBoost, and Random Forest to select the best performer per task",
      "Reached 99.1% accuracy for patient status and 89% for injury type through careful tuning and validation",
    ],
    stack: ["Scikit-learn", "XGBoost", "Pandas"],
    tags: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "ML", "Data Analysis"],
    status: "source",
    statusLabel: SOURCE,
    githubUrl: "https://github.com/B-I-T-W-I-S-E-M-I-N-D-S/Apply-Data-PreProcessing",
    caseStudyHref: "/case-study/road-accident-analysis",
    domain: "github.com/B-I-T-W-I-S-E-M-I-N-D-S",
    image: "/images/projects/road-accident-analysis.webp",
    imageAlt: "Road Accident Analysis System — machine learning pipeline overview",
    featured: false,
  },
  {
    slug: "movie-reservation",
    name: "Movie Reservation|Website",
    shortName: "Movie Reservation Website",
    industry: "Agile-Driven Full-Stack App",
    tagline: "Scalable full-stack application built with the Agile Scrum methodology.",
    summary:
      "A professional web application demonstrating modern development practices, built by a 5-member team following Agile principles with comprehensive testing and documentation.",
    features: [
      "Complete movie browsing and reservation system",
      "Frontend/backend architecture with the MVC pattern",
      "RESTful API design for seamless communication",
      "Comprehensive code documentation using JSDoc",
      "Unit and integration testing with Jest",
      "Agile Scrum methodology with sprint planning and retrospectives",
      "Team collaboration using Git and Trello",
    ],
    challenges: [
      "Coordinating a 5-member team under Agile Scrum with limited prior team-project experience",
      "Keeping frontend and backend in sync through a clean, documented API contract",
      "Maintaining code quality and reliability across contributors",
    ],
    solutions: [
      "Followed sprint planning and retrospectives to keep scope and priorities aligned week to week",
      "Adopted an MVC pattern with a RESTful API to decouple frontend and backend development",
      "Enforced documentation with JSDoc and coverage with Jest unit/integration tests",
    ],
    stack: ["React.js", "Express.js", "MongoDB"],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "MVC", "Jest", "JSDoc", "Agile"],
    status: "source",
    statusLabel: SOURCE,
    githubUrl: "https://github.com/sazzadadib/BookMySeats-A-cinema-seat-booking-system",
    caseStudyHref: "/case-study/movie-reservation",
    domain: "github.com/sazzadadib/BookMySeats",
    image: "/images/projects/movie-reservation.webp",
    imageAlt: "Agile-Driven Movie Reservation Website",
    featured: false,
  },
  {
    slug: "viper-travel",
    name: "Viper|Travel",
    shortName: "Viper Travel",
    industry: "Travel Booking Website",
    tagline: "Full-featured travel booking platform with an SQL-based backend.",
    summary:
      "A complete travel management system with robust database operations, providing users with seamless booking experiences and travel planning capabilities.",
    features: [
      "Comprehensive travel booking functionality",
      "SQL-based CRUD operations for data management",
      "User authentication and session management",
      "Search and filter capabilities for destinations",
      "Booking history and management features",
      "Responsive design for mobile and desktop",
    ],
    challenges: [
      "Managing complex booking logic and data integrity with raw SQL rather than an ORM",
      "Building secure user authentication and session handling from scratch in PHP",
      "Delivering a consistent experience across mobile and desktop without a component framework",
    ],
    solutions: [
      "Designed normalized SQL schemas with dedicated CRUD APIs for reliable booking operations",
      "Implemented server-side session-based authentication with input validation for security",
      "Used responsive CSS layouts and progressive enhancement for cross-device consistency",
    ],
    stack: ["PHP", "MySQL", "JavaScript"],
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "SQL", "CRUD API"],
    status: "source",
    statusLabel: SOURCE,
    githubUrl: "https://github.com/sazzadadib/Viper_Travels",
    caseStudyHref: "/case-study/viper-travel",
    domain: "github.com/sazzadadib/Viper_Travels",
    image: "/images/projects/viper-travel.webp",
    imageAlt: "Viper Travel booking website",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
