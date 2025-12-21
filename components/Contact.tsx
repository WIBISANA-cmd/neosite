export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-primary/10 to-transparent -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="reveal-hidden">
            <h2 className="text-4xl font-bold mb-6">
              Let&apos;s build something <span className="text-neon-primary">legendary.</span>
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              Ready to elevate your digital presence? Fill out the form, and we&apos;ll get back to you with a proposal.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 glass-card p-4 neon-border">
                <div className="w-12 h-12 rounded-full bg-neon-primary/10 flex items-center justify-center text-neon-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-white">Email Us</h5>
                  <p className="text-gray-400">hello@neosite.digital</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass-card p-4 neon-border">
                <div className="w-12 h-12 rounded-full bg-neon-primary/10 flex items-center justify-center text-neon-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-white">Studio</h5>
                  <p className="text-gray-400">Neo-Tokyo Digital District, Level 42</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-12">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary transition-all" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.56v14.9c0 2.5-2.04 4.54-4.54 4.54H4.54C2.04 24 0 21.96 0 19.46V4.56C0 2.06 2.04.02 4.54.02h14.9c2.5 0 4.54 2.04 4.54 4.54zm-6.5 5.13c.05.7.08 1.42.08 2.15 0 6.57-5.01 14.14-14.14 14.14v-.01c-2.55 0-4.93-.74-6.97-2.04 2.38.28 4.76-.34 6.75-1.64-1.99-.04-3.67-1.36-4.26-3.18.69.1 1.38.07 2.04-.1-2.09-.42-3.67-2.27-3.67-4.5v-.06c.61.34 1.32.55 2.08.57-1.95-1.3-2.56-3.88-1.37-5.92 2.25 2.76 5.63 4.58 9.43 4.77-.69-2.94 1.51-5.85 4.48-5.85 1.32 0 2.51.56 3.35 1.45 1.04-.2 2.02-.58 2.9-1.1.36 1.08 1.07 1.97 1.97 2.5-.92-.1-1.8-.35-2.63-.72z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-primary hover:border-neon-primary transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="reveal-hidden animation-delay-200">
            <form id="contact-form" className="glass-card p-8 neon-border space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-neon-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-neon-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full bg-neon-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary transition-colors appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Range
                  </option>
                  <option value="5k-10k">$5k - $10k</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k+">$25k+</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-neon-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button type="submit" className="btn-primary w-full shadow-neon-glow">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
