export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-secondary/10 rounded-full mix-blend-screen filter blur-[120px] -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 reveal-hidden">
            <h2 className="text-4xl font-bold">
              About <span className="text-neon-primary">NeoSite</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We are a collective of forward-thinking designers and developers obsessed with pushing the boundaries of digital interaction. We don&apos;t just build websites; we create digital ecosystems that propel brands into the future.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neon-primary shadow-neon-glow">
                Innovation First
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neon-primary shadow-neon-glow">
                Pixel Perfection
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neon-primary shadow-neon-glow">
                User-Centric
              </span>
            </div>
          </div>

          <div className="relative space-y-12 pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:h-[calc(100%-20px)] before:w-0.5 before:bg-gradient-to-b before:from-neon-primary before:to-neon-secondary/20 reveal-hidden">
            <div className="relative timeline-item">
              <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-neon-dark border-2 border-neon-primary shadow-neon-glow z-10" />
              <h4 className="text-xl font-bold text-neon-primary">01. Discover</h4>
              <p className="text-gray-400 mt-2">We dive deep into your goals, audience, and competition to uncover unique opportunities.</p>
            </div>
            <div className="relative timeline-item reveal-hidden animation-delay-200">
              <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-neon-dark border-2 border-neon-primary shadow-neon-glow z-10" />
              <h4 className="text-xl font-bold text-neon-primary">02. Design</h4>
              <p className="text-gray-400 mt-2">Crafting futuristic visuals and intuitive prototypes that define your digital presence.</p>
            </div>
            <div className="relative timeline-item reveal-hidden animation-delay-400">
              <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-neon-dark border-2 border-neon-primary shadow-neon-glow z-10" />
              <h4 className="text-xl font-bold text-neon-primary">03. Build</h4>
              <p className="text-gray-400 mt-2">Developing robust, scalable solutions using the latest web technologies.</p>
            </div>
            <div className="relative timeline-item reveal-hidden animation-delay-600">
              <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-neon-dark border-2 border-neon-primary shadow-neon-glow z-10" />
              <h4 className="text-xl font-bold text-neon-primary">04. Launch & Grow</h4>
              <p className="text-gray-400 mt-2">Deploying seamlessly and providing ongoing optimization for continued success.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
