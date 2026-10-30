export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  expandedDesc: string;
  category: string;
  metrics: string;
  deliverables: string[];
  ctaText: string;
}

export interface GrowthStage {
  step: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  deliverable: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'Social Media' | 'Reels' | 'Branding' | 'Web & UI';
  tagline: string;
  accentColor: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceINR: string;
  priceUSD: string;
  period: string;
  popular?: boolean;
  tagline: string;
  deliverables: string[];
  cta: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  verified: boolean;
}

export const AGENCY_INFO = {
  name: "Rudraksh Innovations",
  legalName: "Rudraksh Innovations Private Limited",
  incorporationDate: "July 10, 2024",
  directors: ["Viral Prafulbhai Patel", "Parulben Gaurangbhai Daraji"],
  tagline: "Precision Meets Imagination.",
  heroEyebrow: "IDEAS · TECHNOLOGY · IMPACT",
  heroHeadline: "Innovate Today For A Better Tomorrow.",
  heroSupport:
    "We build intelligent digital solutions that help businesses grow, transform, and stay ahead in the ever-changing world.",
  philosophy: {
    headline: "Soul & Science",
    dnaTitle: "The Rudraksh DNA",
    soulSubtitle: "The Soul (Ancient Wisdom & Laser Focus)",
    soulDesc:
      "The name 'Rudraksh' symbolizes focus, clarity, and protection. In a world saturated with digital noise, we cut through the chaos to focus your message with laser precision.",
    values: [
      {
        name: "Radical Transparency",
        desc: "No vanity metrics or smoke screens. Real business growth, transparent analytics, and clear ROI reporting.",
      },
      {
        name: "Obsessive ROI",
        desc: "Every rupee and dollar invested must trace back to measurable customer acquisition, lead velocity, and revenue.",
      },
      {
        name: "Creative Courage",
        desc: "Breaking through social algorithms requires bold creative hooks, high-retention video pacing, and refined visual craft.",
      },
    ],
    scienceSubtitle: "The Science (Integrated Digital Mastery)",
    scienceDesc:
      "We are an innovation and growth engine. We build cohesive digital ecosystems through intelligent marketing, proprietary AI frameworks, high-performance web platforms, and data-first methodologies.",
    mission:
      "To empower businesses with integrated digital solutions, from intelligent marketing and high-performance web platforms to strategic digital consulting.",
    vision:
      "A future where businesses of all sizes leverage cutting-edge technology and AI to achieve sustainable growth and digital dominance.",
  },
  contact: {
    website: "https://rudrakshinnovations.com/",
    email: "info@rudrakshinnovations.com",
    supportEmail: "contact@rudrakshinnovations.com",
    phone: "+91 78743 31074",
    alternatePhone: "+91 81281 55486",
    address: "Rudraksh Innovations, Vastral, Ahmedabad, Gujarat 382418, India",
    city: "Vastral, Ahmedabad, Gujarat",
    country: "India",
    pinCode: "382418",
    googleMapsUrl: "https://maps.app.goo.gl/1jXPUAQjMZorWLgE6",
    socials: {
      instagram: "https://www.instagram.com/rudraksh_innovations_/",
      linkedin: "https://linkedin.com/company/rudraksh-innovations",
      whatsapp: "https://wa.me/917874331074?text=Hello%20Rudraksh%20Innovations%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.",
    },
  },
  brandStatement:
    "Redefining digital dominance. We merge creative brilliance with algorithmic precision to build brands that lead the future.",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "social-media-marketing",
    number: "01",
    title: "Social Media Marketing",
    category: "Organic Reach & Community",
    shortDesc: "Strategic multi-channel social campaigns that build cult followings and viral watch-time.",
    expandedDesc:
      "Full-spectrum social media dominance across Instagram, Meta, LinkedIn, and YouTube. From viral hook scripting and high-retention vertical video to active community management and algorithmic optimization, we turn audiences into paying brand advocates.",
    metrics: "Multi-Platform Coverage & 300%+ Engagement Lift",
    deliverables: [
      "Strategic Monthly Omnichannel Content Calendar",
      "High-Retention Reels, Shorts & Carousel Production",
      "Daily Real-Time Community Engagement & DM Funnels",
      "Brand Tone Governance & Algorithmic Calibration",
    ],
    ctaText: "Explore Social Media Marketing",
  },
  {
    id: "digital-marketing",
    number: "02",
    title: "Digital Marketing",
    category: "360° Growth Engine",
    shortDesc: "End-to-end digital acquisition, search domination, and full-funnel customer journey.",
    expandedDesc:
      "We build comprehensive digital ecosystems merging technical SEO, content marketing, automated lifecycle email journeys, and conversion rate optimization (CRO) to guarantee predictable brand visibility and sustainable revenue velocity.",
    metrics: "360° Omnichannel Market Leadership",
    deliverables: [
      "Comprehensive Digital Strategy & Competitor Audits",
      "Technical & Local SEO for First-Page Rankings",
      "Automated Lifecycle Email & SMS Nurture Funnels",
      "Conversion Rate Optimization & Funnel Architecture",
    ],
    ctaText: "Explore Digital Marketing",
  },
  {
    id: "paid-marketing",
    number: "03",
    title: "Paid Marketing",
    category: "Performance Capital & ROAS",
    shortDesc: "High-ROI Meta, Google & programmatic advertising with mathematical precision.",
    expandedDesc:
      "Deploy ad budgets where conversion efficiency is proven. We engineer multi-tier A/B creative testing, server-side tracking, high-intent retargeting funnels, and algorithmic bid management across Meta Ads and Google Search/Display.",
    metrics: "4.8x+ Blended Return on Ad Spend (ROAS)",
    deliverables: [
      "High-Converting Meta & Google Ad Deployments",
      "Multi-Variant Creative & Copy A/B Testing",
      "Server-Side Conversions API & Pixel Attribution",
      "Predictive Bid Management & Budget Scaling",
    ],
    ctaText: "Explore Paid Marketing",
  },
  {
    id: "web-development",
    number: "04",
    title: "Web Development",
    category: "High-Converting Flagships",
    shortDesc: "Futuristic 3D, responsive, and ultra-fast web platforms built to convert.",
    expandedDesc:
      "Design and develop immersive modern web applications and landing pages using React, Next.js, and Three.js/WebGL. Engineered for sub-second load times, flawless mobile responsiveness, and aggressive conversion rate optimization.",
    metrics: "Sub-Second Global Load & 99+ Lighthouse Score",
    deliverables: [
      "Interactive 3D / WebGL Visual Experiences",
      "Modern React & Next.js TypeScript Frameworks",
      "Conversion-Engineered Landing Flows & Portals",
      "Mobile-First Responsive Perfection & CDN Edge Caching",
    ],
    ctaText: "Explore Web Development",
  },
  {
    id: "software-development",
    number: "05",
    title: "Software Development",
    category: "Bespoke Systems & Cloud Architecture",
    shortDesc: "Scalable SaaS platforms, custom enterprise software, and automated workflows.",
    expandedDesc:
      "We architect robust, enterprise-grade software applications, custom APIs, automated business operating tools, and cloud-native backends tailored to your exact operational requirements with bank-level security and 99.99% uptime.",
    metrics: "99.99% Uptime & Enterprise Cloud Architecture",
    deliverables: [
      "Custom SaaS & Internal Workflow Platform Engineering",
      "Robust REST & GraphQL APIs with Secure Authentication",
      "Scalable Relational / NoSQL Database Design",
      "Automated DevOps, CI/CD & Cloud Infrastructure",
    ],
    ctaText: "Explore Software Development",
  },
];

export const GROWTH_STAGES: GrowthStage[] = [
  {
    step: "01",
    title: "The Deep Scan",
    category: "Audit & Insight",
    problem: "Most brands fly blind without understanding their true algorithmic bottleneck.",
    solution:
      "Analyze the competitive landscape, target audience opportunities, current brand footprint, and past campaign performance to build an actionable growth blueprint.",
    deliverable: "360° Digital Growth Blueprint",
  },
  {
    step: "02",
    title: "Viral Engineering",
    category: "Content Creation",
    problem: "Content that gets ignored by algorithmic feed scroll and fails to convert.",
    solution:
      "Develop compelling visual concepts, retention-focused video scripts, strong hooks, and high-production assets calibrated to capture immediate attention.",
    deliverable: "High-Retention Visual & Reel Suite",
  },
  {
    step: "03",
    title: "Precision Targeting",
    category: "Distribution",
    problem: "Wasted advertising budget reaching low-intent audience segments.",
    solution:
      "Deploy laser-focused Meta Ads, Google campaigns, and local search dominance to acquire qualified leads and high-intent paying customers.",
    deliverable: "Mathematical Customer Acquisition",
  },
  {
    step: "04",
    title: "The Scale Loop",
    category: "Optimization",
    problem: "Stagnant growth after the initial traction plateau.",
    solution:
      "Evaluate real-time analytics, double down on winning creative angles, optimize conversions, and integrate automated email and retargeting workflows.",
    deliverable: "Continuous Growth & Compounding ROI",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceINR: "₹6,999",
    priceUSD: "$199",
    period: "/month",
    popular: false,
    tagline: "Essential growth foundation for emerging brands and ambitious local businesses.",
    deliverables: [
      "16 High-Quality Social Posts / Month",
      "Active Community Management",
      "Monthly In-Depth Performance Report",
      "1 Produced Reel / Short / Month",
      "Brand Tone & Content Calendar",
      "Standard Turnaround & Support",
    ],
    cta: "Choose Starter Plan",
  },
  {
    id: "growth",
    name: "Growth",
    priceINR: "₹10,499",
    priceUSD: "$349",
    period: "/month",
    popular: true,
    tagline: "Accelerated brand scaling with paid acquisition and dynamic short-form video.",
    deliverables: [
      "20 High-Converting Social Posts / Month",
      "2 Produced Reels / Shorts / Month",
      "Full Community Management & Engagement",
      "Paid Ad Campaign Management (Meta/Google)",
      "Bi-Weekly Analytics & ROI Reports",
      "Dedicated Account Manager",
      "Audience Retargeting Setup",
    ],
    cta: "Choose Growth Plan",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceINR: "Custom",
    priceUSD: "Custom",
    period: "Pricing",
    popular: false,
    tagline: "Bespoke digital dominance for high-growth firms, D2C brands, and institutions.",
    deliverables: [
      "Unlimited Posts & Premium Creative Assets",
      "Daily High-End Reel & Video Production",
      "Full Multi-Channel Paid Ad Architecture",
      "Custom Web Development & 3D Experiences",
      "Dedicated Full Creative Squad",
      "24/7 Priority Support & Direct Slack",
      "Comprehensive Brand Identity System",
    ],
    cta: "Discuss a Custom Plan",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    author: "David Chen",
    role: "CEO",
    company: "Orbit Technology",
    quote:
      "Rudraksh Innovations completely revolutionized our online presence. Our engagement is up 300% in just 3 months. Professional, visionary, and thoroughly results-driven.",
    verified: true,
  },
  {
    id: "t2",
    author: "Mike Ross",
    role: "Founder",
    company: "Spectra Digital",
    quote:
      "Professional, futuristic, and results-driven. The best agency we've ever worked with. Their growth protocol systematically pinpointed our bottlenecks and scaled our Meta ad ROI.",
    verified: true,
  },
  {
    id: "t3",
    author: "Sarah Jenkins",
    role: "Chief Marketing Officer",
    company: "TechFlow Dynamics",
    quote:
      "Rudraksh Innovations brought surgical clarity to our social presence. The quality of their reel production and algorithmic targeting elevated our brand perception immediately.",
    verified: true,
  },
  {
    id: "t4",
    author: "Jessica Lee",
    role: "Creative Director",
    company: "Luxe Living Studio",
    quote:
      "A rare agency that understands luxury aesthetics as deeply as conversion math. The visual consistency they maintain across all digital touchpoints is remarkable.",
    verified: true,
  },
];
