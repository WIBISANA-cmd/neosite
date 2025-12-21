import { FAQItem } from "../lib/cmsDefaults";

type Props = { title: string; items: FAQItem[] };

export function FAQ({ title, items }: Props) {
  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-12 reveal-hidden">
          <h2 className="text-4xl font-bold mb-4">
            {title.split(" ").slice(0, -1).join(" ")} <span className="text-neon-primary">{title.split(" ").slice(-1)}</span>
          </h2>
        </div>
        <div className="space-y-4 reveal-hidden" id="faq-accordion">
          {items.map((item, idx) => (
            <div key={item.q + idx} className="glass-card neon-border overflow-hidden faq-item">
              <button className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                <span className="text-lg font-bold text-white">{item.q}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-primary transform transition-transform duration-300 faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className="max-h-0 overflow-hidden transition-all duration-500 faq-content">
                <div className="p-6 pt-0 text-gray-400">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
