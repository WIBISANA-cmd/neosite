import { ServiceItem } from "../lib/cmsDefaults";

type Props = {
  title: string;
  description: string;
  filters: string[];
  items: ServiceItem[];
};

function ServiceIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "code":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
    case "chart":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />;
    case "cloud":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />;
    case "shield":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />;
    case "spark":
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />;
    case "pen":
    default:
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />;
  }
}

export function Services({ title, description, filters, items }: Props) {
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");
  return (
    <section id="services" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden">
          <h2 className="text-4xl font-bold mb-4">
            {firstWords} <span className="text-neon-primary">{lastWord}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal-hidden">
          <button className="service-filter-btn active px-4 py-2 rounded-full border border-neon-primary/50 bg-neon-primary/10 text-neon-primary text-sm transition-all hover:shadow-neon-glow" data-filter="all">
            All Services
          </button>
          {filters
            .filter((f) => f && f !== "all")
            .map((filterKey) => (
              <button
                key={filterKey}
                className="service-filter-btn px-4 py-2 rounded-full border border-white/10 hover:border-neon-primary/50 hover:text-neon-primary text-sm transition-all"
                data-filter={filterKey.toLowerCase()}
              >
                {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
              </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {items.map((service, idx) => (
            <div
              key={service.title + idx}
              className={`glass-card p-8 neon-border tilt-card group reveal-hidden ${idx % 3 === 1 ? "animation-delay-200" : idx % 3 === 2 ? "animation-delay-400" : ""}`}
              data-tilt
              data-category={service.category}
            >
              <div className="tilt-content space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-neon-secondary to-neon-primary flex items-center justify-center shadow-neon-glow mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <ServiceIcon icon={service.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-neon-primary transition-colors">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
