export const site = {
  name: "Sazzad Hossain Adib",
  fullName: "MD. Sazzad Hossain Adib",
  shortName: "Sazzad",
  role: "AI Engineer & Full-Stack Developer",
  title: "Sazzad Hossain Adib — AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of MD. Sazzad Hossain Adib — AI Engineer specializing in LLM systems, RAG pipelines, efficient model deployment, and full-stack AI applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "Dhaka, Bangladesh",
  address: "Uttara, Dhaka-1230, Bangladesh",
  timeZone: "Asia/Dhaka",
  timeZoneLabel: "GMT+6",
  availability: "Open to AI engineering roles",
  email: "sazzad.adib@northsouth.edu",
  githubHandle: "@sazzadadib",
  linkedinHandle: "in/sazzadadib",
  links: {
    github: "https://github.com/sazzadadib",
    linkedin: "https://linkedin.com/in/sazzadadib",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
};

/** Entries of the full-screen menu, in order. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/", note: "Where it starts" },
  { label: "Projects", href: "/projects", note: "09 entries · code on GitHub" },
  { label: "Services", href: "/services", note: "What I build, and how" },
  { label: "About", href: "/about", note: "The human behind it" },
  { label: "GitHub", href: site.links.github, note: "Repositories & code", external: true },
  { label: "Contact", href: "/contact", note: "Start something" },
];

/** Big links at the top of the footer. */
export const footerPrimary = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;

export const footerSecondary = [
  { label: "Case Studies", href: "/case-study" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "github", href: site.links.github, aria: "Visit GitHub profile" },
  { label: "linkedin", href: site.links.linkedin, aria: "Visit LinkedIn profile" },
  { label: "email", href: `mailto:${site.email}`, aria: "Send an email" },
] as const;

/** The ticker that runs along the bottom of the footer. */
export const footerTicker = [
  { strong: site.availability, soft: "AI engineering & full-stack development" },
  { strong: site.email, soft: "Let's build something together" },
  { strong: "Based in Bangladesh", soft: "Uttara, Dhaka" },
] as const;
