export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-secondary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob-float animation-delay-2000" />
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk1MCIgaGVpZ2h0PSIxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDEwMGgxOTUwTTAtMTAwaDE5NTBNOTc1IDAgdjEwMDBNOTc1IDAgdi0xMDAwIiBzdHJva2U9InJnYmEoMCwgMjQ3LCAyNTUsIDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] z-0"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left reveal-hidden">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            We forge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
              digital futures
            </span>{" "}
            that glow.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
            NeoSite is a next-generation creative studio building immersive web experiences, future-proof branding, and scalable platforms.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#contact" className="btn-primary shadow-neon-glow">
              Start Project
            </a>
            <a href="#works" className="btn-secondary">
              View Works
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 reveal-hidden animation-delay-300">
          <div className="glass-card p-6 neon-border tilt-card" data-tilt>
            <div className="tilt-content">
              <p className="text-4xl font-bold text-neon-primary flex items-baseline">
                <span className="count-up" data-target="150">
                  0
                </span>
                +
              </p>
              <p className="text-sm text-gray-400 mt-2">Projects Launched</p>
            </div>
          </div>
          <div className="glass-card p-6 neon-border tilt-card mt-8" data-tilt>
            <div className="tilt-content">
              <p className="text-4xl font-bold text-neon-secondary flex items-baseline">
                <span className="count-up" data-target="98">
                  0
                </span>
                %
              </p>
              <p className="text-sm text-gray-400 mt-2">Client Satisfaction</p>
            </div>
          </div>
          <div className="glass-card p-6 neon-border tilt-card" data-tilt>
            <div className="tilt-content">
              <p className="text-4xl font-bold text-white flex items-baseline">
                <span className="count-up" data-target="50">
                  0
                </span>
                +
              </p>
              <p className="text-sm text-gray-400 mt-2">Global Partners</p>
            </div>
          </div>
          <div className="glass-card p-6 neon-border tilt-card mt-8" data-tilt>
            <div className="tilt-content">
              <p className="text-4xl font-bold text-neon-primary flex items-baseline">
                4.9<span className="text-xl">/5</span>
              </p>
              <p className="text-sm text-gray-400 mt-2">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
