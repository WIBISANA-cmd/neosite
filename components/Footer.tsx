export function Footer() {
  return (
    <footer className="bg-black/40 py-12 border-t border-white/5 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <a href="#hero" className="text-xl font-display font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 bg-gradient-to-tr from-neon-secondary to-neon-primary rounded-md flex items-center justify-center shadow-neon-glow">N</span>
          NeoSite.
        </a>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <a href="#services" className="hover:text-neon-primary transition-colors">
            Services
          </a>
          <a href="#works" className="hover:text-neon-primary transition-colors">
            Works
          </a>
          <a href="#about" className="hover:text-neon-primary transition-colors">
            About
          </a>
          <a href="#" className="hover:text-neon-primary transition-colors">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm text-gray-500">© 2023 NeoSite Digital. All rights reserved.</p>
      </div>
      <button
        id="back-to-top"
        className="fixed bottom-8 right-8 p-3 rounded-full bg-neon-primary/20 border border-neon-primary text-neon-primary shadow-neon-glow opacity-0 invisible transition-all duration-300 hover:bg-neon-primary hover:text-neon-dark z-40"
        aria-label="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
