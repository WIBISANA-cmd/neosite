export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-neon-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden">
          <h2 className="text-4xl font-bold mb-4">
            Client <span className="text-neon-primary">Stories</span>
          </h2>
          <p className="text-gray-400">Trusted by visionaries across the globe.</p>
        </div>

        <div className="relative max-w-4xl mx-auto glass-card p-8 sm:p-12 neon-border reveal-hidden" id="testimonial-carousel">
          <div className="overflow-hidden relative h-64 sm:h-48">
            <div className="testimonial-slide absolute inset-0 transition-all duration-500 ease-in-out flex flex-col justify-center opacity-100 translate-x-0">
              <div className="flex items-center gap-1 text-neon-primary mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={`star1-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-medium italic text-white mb-8">
                &quot;NeoSite transformed our outdated platform into a futuristic masterpiece. Their attention to detail and innovative approach tripled our engagement.&quot;
              </p>
              <div className="flex items-center gap-4">
                <img src="https://source.unsplash.com/random/100x100?portrait,ceo" alt="Sarah K." className="w-12 h-12 rounded-full border-2 border-neon-primary object-cover" />
                <div>
                  <h5 className="font-bold text-white">Sarah K.</h5>
                  <p className="text-sm text-gray-400">CEO, TechNova</p>
                </div>
              </div>
            </div>
            <div className="testimonial-slide absolute inset-0 transition-all duration-500 ease-in-out flex flex-col justify-center opacity-0 translate-x-full">
              <div className="flex items-center gap-1 text-neon-primary mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={`star2-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-medium italic text-white mb-8">
                &quot;A team of true professionals. They delivered a complex SaaS project ahead of schedule and beyond our expectations. Highly recommended.&quot;
              </p>
              <div className="flex items-center gap-4">
                <img src="https://source.unsplash.com/random/100x100?portrait,cto" alt="James L." className="w-12 h-12 rounded-full border-2 border-neon-primary object-cover" />
                <div>
                  <h5 className="font-bold text-white">James L.</h5>
                  <p className="text-sm text-gray-400">CTO, Orbital Dynamics</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2" id="testimonial-dots">
              <button className="w-3 h-3 rounded-full bg-neon-primary shadow-neon-glow transition-all" aria-label="Slide 1" />
              <button className="w-3 h-3 rounded-full bg-white/20 hover:bg-neon-primary/50 transition-all" aria-label="Slide 2" />
            </div>
            <div className="flex gap-4">
              <button id="prev-slide" className="p-2 rounded-full border border-white/10 hover:border-neon-primary/50 hover:text-neon-primary transition-all" aria-label="Previous Slide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button id="next-slide" className="p-2 rounded-full border border-white/10 hover:border-neon-primary/50 hover:text-neon-primary transition-all" aria-label="Next Slide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
