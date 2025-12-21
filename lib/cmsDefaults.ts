export type NavLink = { label: string; href: string };
export type HeroStat = { value: string; label: string };
export type ServiceItem = { title: string; icon: string; desc: string; category: string };
export type WorkItem = { title: string; category: string; desc: string; tags: string; img: string };
export type TimelineStep = { title: string; desc: string };
export type Testimonial = { name: string; role: string; message: string; rating: number };
export type FAQItem = { q: string; a: string };
export type FooterLink = { label: string; href: string };

export type CMSData = {
  global: {
    brandName: string;
    tagline: string;
    accent: string;
    email: string;
    address: string;
    social: { twitter: string; github: string; linkedin: string; instagram: string };
  };
  navbar: { links: NavLink[]; ctaText: string; ctaLink: string; signInText?: string };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: HeroStat[];
  };
  services: { title: string; description: string; filters: string; items: ServiceItem[] };
  works: { title: string; description: string; items: WorkItem[] };
  about: { title: string; content: string; values: string[] };
  timeline: { steps: TimelineStep[] };
  testimonials: { title: string; items: Testimonial[] };
  faq: { items: FAQItem[] };
  contact: { heading: string; emailRecipient: string; successMessage: string };
  footer: { copyright: string; links: FooterLink[] };
  seo: { title: string; description: string; robotsIndex: boolean };
};

export const defaultCmsData: CMSData = {
  global: {
    brandName: "NeoSite",
    tagline: "Futuristic Digital Solutions",
    accent: "blue",
    email: "hello@neosite.digital",
    address: "Neo-Tokyo Digital District, Level 42",
    social: { twitter: "#", github: "#", linkedin: "#", instagram: "#" },
  },
  navbar: {
    links: [
      { label: "Home", href: "#hero" },
      { label: "Services", href: "#services" },
      { label: "Works", href: "#works" },
      { label: "About", href: "#about" },
      { label: "Testimonials", href: "#testimonials" },
    ],
    ctaText: "Get Proposal",
    ctaLink: "#contact",
    signInText: "Sign In",
  },
  hero: {
    headline: "We forge digital futures that glow.",
    subheadline: "NeoSite is a next-generation creative studio building immersive web experiences.",
    ctaPrimary: "Start Project",
    ctaSecondary: "View Works",
    stats: [
      { value: "150+", label: "Projects Launched" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "50+", label: "Global Partners" },
      { value: "4.9/5", label: "Average Rating" },
    ],
  },
  services: {
    title: "Our Expertise",
    description: "High-performance solutions tailored for the modern digital landscape.",
    filters: "all,design,development,growth",
    items: [
      {
        title: "UI/UX Design",
        icon: "pen",
        desc: "Crafting intuitive interfaces and engaging user experiences that convert and retain.",
        category: "design",
      },
      {
        title: "Modern Web Dev",
        icon: "code",
        desc: "Building blazing-fast, responsive websites using cutting-edge technologies.",
        category: "development",
      },
      {
        title: "SEO & Growth",
        icon: "chart",
        desc: "Data-driven strategies to increase visibility, traffic, and measurable growth.",
        category: "growth",
      },
      {
        title: "Branding Identity",
        icon: "spark",
        desc: "Forging powerful visual identities that resonate with your target audience.",
        category: "design",
      },
      {
        title: "Maintenance & Security",
        icon: "shield",
        desc: "Keeping your digital assets secure, up-to-date, and performing optimally.",
        category: "development",
      },
      {
        title: "Automation",
        icon: "cloud",
        desc: "Streamlining workflows and integrating systems for maximum efficiency.",
        category: "development",
      },
    ],
  },
  works: {
    title: "Featured Works",
    description: "A showcase of our most recent and impactful digital projects.",
    items: [
      {
        title: "Orbital Dashboard",
        category: "saas",
        desc: "A comprehensive analytics dashboard for a space logistics company.",
        tags: "React, Tailwind, D3.js",
        img: "https://source.unsplash.com/random/800x600?dashboard,dark",
      },
      {
        title: "NeonTech Gear",
        category: "ecommerce",
        desc: "A futuristic e-commerce store for high-end tech gadgets.",
        tags: "Shopify, Liquid, JS",
        img: "https://source.unsplash.com/random/800x600?tech,gadgets",
      },
      {
        title: "AeroSpace Launch",
        category: "landing",
        desc: "High-conversion landing page for a new aerospace startup.",
        tags: "HTML, CSS, GSAP",
        img: "https://source.unsplash.com/random/800x600?rocket,space",
      },
      {
        title: "CryptoFlow",
        category: "saas",
        desc: "Real-time cryptocurrency tracking and portfolio management tool.",
        tags: "Vue.js, Node.js, Socket.io",
        img: "https://source.unsplash.com/random/800x600?crypto,chart",
      },
      {
        title: "FutureSound Festival",
        category: "landing",
        desc: "Immersive event website for an electronic music festival.",
        tags: "WebGL, Three.js",
        img: "https://source.unsplash.com/random/800x600?concert,neon",
      },
      {
        title: "Moda Minimal",
        category: "ecommerce",
        desc: "Clean, minimalist e-commerce experience for a fashion brand.",
        tags: "Next.js, Stripe",
        img: "https://source.unsplash.com/random/800x600?fashion,minimal",
      },
    ],
  },
  about: {
    title: "About NeoSite",
    content:
      "We are a collective of forward-thinking designers and developers obsessed with pushing the boundaries of digital interaction. We don't just build websites; we create digital ecosystems that propel brands into the future.",
    values: ["Innovation First", "Pixel Perfection", "User-Centric"],
  },
  timeline: {
    steps: [
      { title: "Discover", desc: "We dive deep into your goals, audience, and competition to uncover unique opportunities." },
      { title: "Design", desc: "Crafting futuristic visuals and intuitive prototypes that define your digital presence." },
      { title: "Build", desc: "Developing robust, scalable solutions using the latest web technologies." },
      { title: "Launch & Grow", desc: "Deploying seamlessly and providing ongoing optimization for continued success." },
    ],
  },
  testimonials: {
    title: "Client Stories",
    items: [
      {
        name: "Sarah K.",
        role: "CEO, TechNova",
        message:
          "NeoSite transformed our outdated platform into a futuristic masterpiece. Their attention to detail and innovative approach tripled our engagement.",
        rating: 5,
      },
      {
        name: "James L.",
        role: "CTO, Orbital Dynamics",
        message:
          "A team of true professionals. They delivered a complex SaaS project ahead of schedule and beyond our expectations. Highly recommended.",
        rating: 5,
      },
    ],
  },
  faq: {
    items: [
      {
        q: "What services do you specialize in?",
        a: "We specialize in high-end UI/UX design, full-stack web development (react, node), e-commerce solutions, and data-driven SEO strategies.",
      },
      {
        q: "What is your typical project timeline?",
        a: "Timelines vary based on scope. A standard corporate website typically takes 4-6 weeks, while complex web applications can take 3+ months.",
      },
      {
        q: "Do you offer post-launch support?",
        a: "Yes, we offer various maintenance packages to ensure your site remains secure, up-to-date, and performing optimally after launch.",
      },
    ],
  },
  contact: {
    heading: "Let's build something legendary.",
    emailRecipient: "hello@neosite.digital",
    successMessage: "Message sent successfully! We will contact you soon.",
  },
  footer: {
    copyright: "© 2023 NeoSite Digital. All rights reserved.",
    links: [
      { label: "Services", href: "#services" },
      { label: "Works", href: "#works" },
      { label: "About", href: "#about" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  seo: {
    title: "NeoSite - Futuristic Digital Solutions",
    description: "Premium, futuristic digital agency specializing in UI/UX, Web Development, and Growth.",
    robotsIndex: true,
  },
};
