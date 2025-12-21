export function FAQ() {
  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-12 reveal-hidden">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked <span className="text-neon-primary">Questions</span>
          </h2>
        </div>
        <div className="space-y-4 reveal-hidden" id="faq-accordion">
          <div className="glass-card neon-border overflow-hidden faq-item">
            <button className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
              <span className="text-lg font-bold text-white">What services do you specialize in?</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-primary transform transition-transform duration-300 faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-500 faq-content">
              <div className="p-6 pt-0 text-gray-400">
                We specialize in high-end UI/UX design, full-stack web development (react, node), e-commerce solutions, and data-driven SEO strategies.
              </div>
            </div>
          </div>
          <div className="glass-card neon-border overflow-hidden faq-item">
            <button className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
              <span className="text-lg font-bold text-white">What is your typical project timeline?</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-primary transform transition-transform duration-300 faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-500 faq-content">
              <div className="p-6 pt-0 text-gray-400">
                Timelines vary based on scope. A standard corporate website typically takes 4-6 weeks, while complex web applications can take 3+ months.
              </div>
            </div>
          </div>
          <div className="glass-card neon-border overflow-hidden faq-item">
            <button className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
              <span className="text-lg font-bold text-white">Do you offer post-launch support?</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-primary transform transition-transform duration-300 faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-500 faq-content">
              <div className="p-6 pt-0 text-gray-400">
                Yes, we offer various maintenance packages to ensure your site remains secure, up-to-date, and performing optimally after launch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
