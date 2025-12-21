export function Navbar() {
  return (
    <header id="navbar" className="fixed top-0 w-full z-50 transition-all duration-300 bg-transparent py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-display font-bold tracking-wider text-white flex items-center gap-2 group">
          <span className="w-8 h-8 bg-gradient-to-tr from-neon-secondary to-neon-primary rounded-lg flex items-center justify-center shadow-neon-glow group-hover:rotate-12 transition-transform">
            N
          </span>
          NeoSite.
        </a>

        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
          <a href="#hero" className="nav-link transition-colors hover:text-neon-primary">
            Home
          </a>
          <a href="#services" className="nav-link transition-colors hover:text-neon-primary">
            Services
          </a>
          <a href="#works" className="nav-link transition-colors hover:text-neon-primary">
            Works
          </a>
          <a href="#about" className="nav-link transition-colors hover:text-neon-primary">
            About
          </a>
          <a href="#testimonials" className="nav-link transition-colors hover:text-neon-primary">
            Testimonials
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#contact" className="btn-primary group">
            <span className="relative z-10">Get Proposal</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-xl bg-white/30 transition-all duration-300 group-hover:scale-100 group-hover:opacity-0" />
          </a>
        </div>

        <button
          id="mobile-menu-btn"
          className="lg:hidden p-2 text-gray-300 hover:text-neon-primary transition-colors relative z-50"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className="fixed inset-0 bg-neon-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 text-xl translate-x-full transition-transform duration-500 lg:hidden"
      >
        <a href="#hero" className="mobile-nav-link hover:text-neon-primary transition-colors">
          Home
        </a>
        <a href="#services" className="mobile-nav-link hover:text-neon-primary transition-colors">
          Services
        </a>
        <a href="#works" className="mobile-nav-link hover:text-neon-primary transition-colors">
          Works
        </a>
        <a href="#about" className="mobile-nav-link hover:text-neon-primary transition-colors">
          About
        </a>
        <a href="#testimonials" className="mobile-nav-link hover:text-neon-primary transition-colors">
          Testimonials
        </a>
        <a href="#contact" className="btn-primary mt-4">
          Get Proposal
        </a>
      </div>
    </header>
  );
}
