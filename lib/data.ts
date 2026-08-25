/**
 * Single source of truth for all visible site content.
 *
 * Real info provided:
 * - Rajesh
 *
 * Missing business/contact/client proof has been left as clearly editable
 * placeholders so the portfolio stays production-ready without inventing facts.
 */

/** Prefix public files when the site is served from a GitHub Pages repository. */
export const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const BRAND = {
  name: "Rajesh",
  wordmark: "Rajesh",
  role: "Freelance Video Editor",
  headlineTop: "I Edit Stories",
  headlineBottom: "That People Want To Watch",
  email: "add-your-email@example.com",
  phone: "[Add WhatsApp Number]",
  location: "[Add Location]",
  timezone: "[Add Timezone]",
  availability: "Available for freelance editing projects",
  footerNote:
    "Rajesh is a freelance video editor creating engaging content for creators, brands, and businesses.",
  year: 2026,
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about", ariaLabel: "Go to the about section" },
  { label: "Work", href: "#work", ariaLabel: "Go to selected work" },
  { label: "Showreel", href: "#showreel", ariaLabel: "Go to the showreel section" },
  { label: "Services", href: "#services", ariaLabel: "Go to services" },
  { label: "Skills", href: "#skills", ariaLabel: "Go to skills and software" },
  { label: "Process", href: "#process", ariaLabel: "Go to the editing process" },
  { label: "Experience", href: "#experience", ariaLabel: "Go to experience" },
  { label: "Contact", href: "#cta", ariaLabel: "Go to contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Portfolio Use", href: "#" },
  { label: "Licensing", href: "#" },
  { label: "Contact", href: "#cta" },
] as const;

export const SOCIALS = [
  { label: "Email", href: "mailto:add-your-email@example.com" },
  { label: "Instagram", href: "https://instagram.com/your-handle" },
  { label: "WhatsApp", href: "https://wa.me/your-number" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-profile" },
  { label: "YouTube", href: "https://youtube.com/@your-channel" },
] as const;

export const HERO = {
  base: assetPath("/images/hero-base.webp"),
  reveal: assetPath("/images/hero-reveal.webp"),
  identity: "Rajesh / Freelance Video Editor",
  servicesLine: "YouTube • Reels • Shorts • Promotional • Social Media",
  statementStrong: "Stories, pacing, hooks, motion, and polish",
  statementMuted: "built to keep people watching from the first second to the last.",
  primaryCtaLabel: "View My Work",
  primaryCtaHref: "#work",
  secondaryCtaLabel: "Let's Work Together",
  secondaryCtaHref: "#cta",
} as const;

export const ABOUT = {
  label: "(ABOUT)",
  title: "The Editor Behind The Timeline.",
  statementStrong: "Rajesh is a freelance video editor creating engaging content ",
  statementMuted:
    "for creators, brands, and businesses across YouTube, short-form, and social-first campaigns.",
} as const;

export const WORK_CATEGORIES = [
  "ALL",
  "YOUTUBE",
  "SHORT FORM",
  "PROMOTIONAL",
  "SOCIAL MEDIA",
  "MOTION GRAPHICS",
  "THUMBNAILS",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export interface Project {
  index: string;
  title: string;
  category: Exclude<WorkCategory, "ALL">;
  client: string;
  year: string;
  description: string;
  image: string;
  href: string;
  tags: readonly string[];
}

export const PROJECTS: readonly Project[] = [
  {
    index: "01",
    title: "[YouTube Project Title]",
    category: "YOUTUBE",
    client: "[Editable Client / Channel Name]",
    year: "[Year]",
    description:
      "[Add a short summary of the video style, pacing, and what this edit was designed to achieve.]",
    image: assetPath("/images/work-1.jpg"),
    href: "#",
    tags: ["Story Edit", "Retention", "Pacing"],
  },
  {
    index: "02",
    title: "[Short-Form Project Title]",
    category: "SHORT FORM",
    client: "[Editable Creator Name]",
    year: "[Year]",
    description:
      "[Add a short description of the hook, captions, pacing, and why this short-form piece stands out.]",
    image: assetPath("/images/work-2.jpg"),
    href: "#",
    tags: ["Hooks", "Captions", "Reels"],
  },
  {
    index: "03",
    title: "[Promotional Video Title]",
    category: "PROMOTIONAL",
    client: "[Editable Brand Name]",
    year: "[Year]",
    description:
      "[Add the concept, audience, and the kind of polished promo feeling this project delivers.]",
    image: assetPath("/images/work-3.jpg"),
    href: "#",
    tags: ["Brand Film", "Color", "Sound"],
  },
  {
    index: "04",
    title: "[Social Media Edit Title]",
    category: "SOCIAL MEDIA",
    client: "[Editable Business Name]",
    year: "[Year]",
    description:
      "[Add how this edit was tailored for platform-native delivery, fast engagement, and clean branding.]",
    image: assetPath("/images/post-1.jpg"),
    href: "#",
    tags: ["Platform Cut", "Fast Pacing", "Branding"],
  },
  {
    index: "05",
    title: "[Motion Graphics Project Title]",
    category: "MOTION GRAPHICS",
    client: "[Editable Client Name]",
    year: "[Year]",
    description:
      "[Add the animation style, text treatment, transitions, and motion system used in this project.]",
    image: assetPath("/images/post-2.jpg"),
    href: "#",
    tags: ["Motion", "Titles", "Transitions"],
  },
  {
    index: "06",
    title: "[Thumbnail Design Project Title]",
    category: "THUMBNAILS",
    client: "[Editable Channel / Brand Name]",
    year: "[Year]",
    description:
      "[Add what makes the thumbnail clickable, clear, and consistent with the content strategy.]",
    image: assetPath("/images/post-3.jpg"),
    href: "#",
    tags: ["CTR", "Composition", "Design"],
  },
] as const;

export const SHOWREEL = {
  label: "(SHOWREEL)",
  title: "A fast look at pacing, polish, and story-driven editing.",
  blurb:
    "Use this section for your main showreel or highlight reel. Replace the current preview with your strongest edit montage.",
  video: assetPath("/videos/hero.mp4"),
  poster: assetPath("/images/hero-reveal.webp"),
  primaryCtaLabel: "Watch Showreel",
  primaryCtaHref: "#work",
  secondaryCtaLabel: "Start A Project",
  secondaryCtaHref: "#cta",
} as const;

export interface Service {
  index: string;
  title: string;
  blurb: string;
  items: readonly string[];
  image: string;
}

export const SERVICES: readonly Service[] = [
  {
    index: "01",
    title: "YouTube Editing",
    blurb:
      "Long-form edits built around story flow, audience retention, and a polished viewing experience.",
    items: ["Structure", "Pacing", "Retention Hooks"],
    image: assetPath("/images/service-1.jpg"),
  },
  {
    index: "02",
    title: "Short-Form Editing",
    blurb:
      "Fast, platform-native reels and shorts designed to land quickly and keep attention high.",
    items: ["Shorts", "Reels", "Captions"],
    image: assetPath("/images/service-2.jpg"),
  },
  {
    index: "03",
    title: "Promotional Videos",
    blurb:
      "Clean, cinematic edits for launches, campaigns, products, and brand storytelling.",
    items: ["Promos", "Brand Tone", "Delivery Cuts"],
    image: assetPath("/images/service-3.jpg"),
  },
  {
    index: "04",
    title: "Social Media Content",
    blurb:
      "Consistent edits tailored for brand presence across Instagram, YouTube, LinkedIn, and more.",
    items: ["Social Cuts", "Platform Sizing", "Brand Consistency"],
    image: assetPath("/images/service-4.jpg"),
  },
  {
    index: "05",
    title: "Thumbnail Design",
    blurb:
      "Clickable thumbnail direction and visual treatment built to support stronger first impressions.",
    items: ["Thumbnail Design", "Typography", "CTR Focus"],
    image: assetPath("/images/insights-new-bg.png"),
  },
] as const;

export const SPECIALTIES = {
  label: "(FOCUS)",
  heading: "Built For Modern Content Formats",
  cards: [
    {
      title: "YouTube & Long-Form",
      description:
        "Structured edits that balance story, pacing, and watch-time-focused flow.",
      tag: "YouTube",
    },
    {
      title: "Reels, Shorts & Social Cuts",
      description:
        "Sharp hooks, fast captions, and platform-native edits for short attention windows.",
      tag: "Short Form",
    },
    {
      title: "Motion Graphics & Thumbnails",
      description:
        "Supporting visuals that make the content feel polished before and during the play button.",
      tag: "Visual Support",
    },
  ],
} as const;

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: readonly Stat[] = [
  { value: 0, suffix: "", label: "[Add verified editing experience]" },
  { value: 0, suffix: "", label: "[Add verified client or project statistic]" },
  { value: 0, suffix: "", label: "[Add verified audience or delivery statistic]" },
] as const;

export const WHY_US = {
  label: "(WHY RAJESH)",
  heading: "EDITING THAT SERVES THE STORY",
  image: assetPath("/images/why-us.jpg"),
} as const;

export const SKILLS_INTRO = {
  label: "(SKILLS / SOFTWARE)",
  heading: "Editing craft, creative instincts, and the tools behind the timeline.",
  blurb:
    "A premium editing workflow needs more than software. It needs story sense, pace, restraint, and strong finishing.",
} as const;

export const SKILLS = [
  "Video Editing",
  "Storytelling",
  "Motion Graphics",
  "Sound Design",
  "Color Grading",
  "Captions",
  "Retention Editing",
  "Thumbnail Design",
] as const;

export const SOFTWARE = [
  "Premiere Pro",
  "After Effects",
  "CapCut",
  "Photoshop",
  "Canva",
  "AI Tools",
] as const;

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  body: string;
  subsections: string[];
  deliverables: string[];
  image: string;
}

export const PROCESS: readonly ProcessStep[] = [
  {
    id: "understand",
    step: "STEP 01",
    title: "Understand",
    subtitle: "Goals, audience, and content intent",
    body:
      "Every edit starts by understanding what the video needs to do and who it needs to connect with.",
    subsections: ["Audience", "Platform", "Creative Direction"],
    deliverables: ["Creative Brief"],
    image: assetPath("/images/service-1.jpg"),
  },
  {
    id: "plan",
    step: "STEP 02",
    title: "Plan",
    subtitle: "Structure, pacing, and approach",
    body:
      "The strongest edits feel intentional. Planning defines story flow, energy, and the right edit rhythm.",
    subsections: ["Story Flow", "Hook Strategy", "Edit Roadmap"],
    deliverables: ["Edit Plan"],
    image: assetPath("/images/service-2.jpg"),
  },
  {
    id: "edit",
    step: "STEP 03",
    title: "Edit",
    subtitle: "Cut, shape, and build momentum",
    body:
      "This is where footage turns into something watchable, clear, and tuned to hold attention.",
    subsections: ["Assembly Cut", "Timing", "Visual Rhythm"],
    deliverables: ["First Cut"],
    image: assetPath("/images/service-3.jpg"),
  },
  {
    id: "refine",
    step: "STEP 04",
    title: "Refine",
    subtitle: "Polish the details that matter",
    body:
      "Sound, color, captions, motion, and transitions are refined so the final piece feels premium.",
    subsections: ["Sound", "Color", "Captions"],
    deliverables: ["Refined Cut"],
    image: assetPath("/images/service-4.jpg"),
  },
  {
    id: "deliver",
    step: "STEP 05",
    title: "Deliver",
    subtitle: "Platform-ready final files",
    body:
      "Final exports are delivered in the right formats for publishing, review, and future reuse.",
    subsections: ["Exports", "Versions", "Delivery"],
    deliverables: ["Final Files"],
    image: assetPath("/images/cta-bg.jpg"),
  },
] as const;

export interface ExperienceCard {
  title: string;
  blurb: string;
  features: readonly string[];
  featured: boolean;
  cta: string;
}

export const EXPERIENCE_INTRO = {
  label: "(EXPERIENCE)",
  heading: "Editing support designed for creators, brands, and business content.",
} as const;

export const EXPERIENCE: readonly ExperienceCard[] = [
  {
    title: "Creators",
    blurb:
      "For channels and personal brands that need consistent, engaging edits with a clear viewer-first rhythm.",
    features: [
      "YouTube episodes",
      "Reels and shorts",
      "Captions and pacing",
      "Story-led editing",
    ],
    featured: false,
    cta: "View work",
  },
  {
    title: "Brands",
    blurb:
      "For campaigns, launch assets, and polished branded videos that need a premium edit language.",
    features: [
      "Promotional videos",
      "Social cutdowns",
      "Motion support",
      "Brand-safe delivery",
    ],
    featured: true,
    cta: "Start a project",
  },
  {
    title: "Businesses",
    blurb:
      "For businesses building a stronger video presence across social platforms and outbound content.",
    features: [
      "Social-first edits",
      "Platform versions",
      "Thumbnail support",
      "Editable contact flow",
    ],
    featured: false,
    cta: "Get in touch",
  },
] as const;

export const FEATURED_TESTIMONIAL = {
  quote:
    "[Add a strong featured testimonial here about communication, pacing, creative quality, or turnaround.]",
  author: "[Client Name]",
  role: "[Creator / Brand / Business]",
  avatar: assetPath("/images/avatar-featured.jpg"),
  image: assetPath("/images/testimonial-highlight.jpg"),
} as const;

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "[Add real client feedback about the editing style, quality, and creative process.]",
    author: "[Client Name]",
    role: "[Creator / Brand]",
    avatar: assetPath("/images/avatar-1.jpg"),
  },
  {
    quote:
      "[Add real client feedback about communication, revisions, and final delivery.]",
    author: "[Client Name]",
    role: "[Business / Founder]",
    avatar: assetPath("/images/avatar-2.jpg"),
  },
  {
    quote:
      "[Add real client feedback about pacing, storytelling, or audience engagement.]",
    author: "[Client Name]",
    role: "[YouTube Creator]",
    avatar: assetPath("/images/avatar-3.jpg"),
  },
  {
    quote:
      "[Add real client feedback about social content, promos, or thumbnail support.]",
    author: "[Client Name]",
    role: "[Marketing Team]",
    avatar: assetPath("/images/avatar-4.jpg"),
  },
] as const;

export const TESTIMONIALS_INTRO = {
  label: "(TESTIMONIALS)",
  heading: "Client feedback goes here once real reviews are ready to publish.",
  rating: "N/A",
  ratingNote: "[Add verified testimonial rating]",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: readonly FaqItem[] = [
  {
    question: "What kind of videos can Rajesh edit?",
    answer:
      "You can use this portfolio for YouTube videos, reels, shorts, promotional videos, social media content, motion graphics support, and thumbnail design.",
  },
  {
    question: "Can I request platform-specific versions?",
    answer:
      "Yes. Add your preferred export sizes, aspect ratios, and final delivery expectations here.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Replace this with your real revision policy so clients know how feedback and refinement are handled.",
  },
  {
    question: "What is needed before editing starts?",
    answer:
      "Replace this with your preferred project handoff details such as footage, references, script notes, and brand direction.",
  },
  {
    question: "How can a client get in touch?",
    answer:
      "Use the contact section below and replace the placeholder email, WhatsApp, Instagram, LinkedIn, and YouTube links with your real details.",
  },
] as const;

export const CTA = {
  headingLine1: "Have A Video",
  headingLine2: "In Mind?",
  blurb:
    "Let's turn it into something worth watching. Replace the contact details below with your live email and social links.",
  buttonLabel: "Start A Project",
  buttonHref: "mailto:add-your-email@example.com",
  image: assetPath("/images/cta-bg.jpg"),
} as const;

export interface PricingTier {
  name: string;
  blurb: string;
  monthly: number | null;
  annual: number | null;
  features: readonly string[];
  featured: boolean;
  cta: string;
}

export const ANNUAL_DISCOUNT = 0;

export const PRICING: readonly PricingTier[] = [
  {
    name: "Short Form",
    blurb: "For reels, shorts, and social-first edits.",
    monthly: null,
    annual: null,
    features: ["Hooks and pacing", "Captions", "Platform-ready delivery"],
    featured: false,
    cta: "Discuss a project",
  },
  {
    name: "YouTube",
    blurb: "For structured long-form edits built around the story.",
    monthly: null,
    annual: null,
    features: ["Story structure", "Retention-focused pacing", "Sound and color polish"],
    featured: true,
    cta: "Discuss a project",
  },
  {
    name: "Custom",
    blurb: "For promotional videos, motion graphics, and mixed content needs.",
    monthly: null,
    annual: null,
    features: ["Promotional edits", "Motion graphics", "Custom delivery requirements"],
    featured: false,
    cta: "Discuss a project",
  },
] as const;

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  href: string;
}

export const POSTS: readonly Post[] = [
  {
    title: "Building A Stronger First Second",
    excerpt: "A placeholder for Rajesh's perspective on hooks, pacing, and creating edits that earn attention quickly.",
    date: "[Date]",
    category: "Editing",
    image: assetPath("/images/post-1.jpg"),
    href: "#",
  },
  {
    title: "Storytelling Through The Cut",
    excerpt: "A placeholder for an editing note about structure, rhythm, and shaping raw footage into a clear story.",
    date: "[Date]",
    category: "Storytelling",
    image: assetPath("/images/post-2.jpg"),
    href: "#",
  },
  {
    title: "One Edit, Multiple Platforms",
    excerpt: "A placeholder for a practical note on adapting video content for YouTube, Shorts, Reels, and social media.",
    date: "[Date]",
    category: "Content Creation",
    image: assetPath("/images/post-3.jpg"),
    href: "#",
  },
] as const;
