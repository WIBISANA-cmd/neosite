import { WorkItem } from "../lib/cmsDefaults";

type Props = {
  title: string;
  description: string;
  items: WorkItem[];
};

export function Works({ title, description, items }: Props) {
  const categories = Array.from(new Set(items.map((item) => item.category.toLowerCase()))).filter(Boolean);
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");
  return (
    <>
      <section id="works" className="section-padding bg-neon-dark/50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <h2 className="text-4xl font-bold mb-4">
              {firstWords} <span className="text-neon-primary">{lastWord}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12 reveal-hidden">
            <button className="work-filter-btn active px-4 py-2 rounded-full border border-neon-primary/50 bg-neon-primary/10 text-neon-primary text-sm transition-all hover:shadow-neon-glow" data-filter="all">
              All Projects
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="work-filter-btn px-4 py-2 rounded-full border border-white/10 hover:border-neon-primary/50 hover:text-neon-primary text-sm transition-all"
                data-filter={cat}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="works-grid">
            {items.map((item, idx) => {
              const imageSrc = item.img || `https://source.unsplash.com/random/800x600?technology,${idx}`;
              return (
                <div
                  key={item.title + idx}
                  className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer reveal-hidden work-item"
                  data-category={item.category.toLowerCase()}
                  data-title={item.title}
                  data-desc={item.desc}
                  data-tech={item.tags}
                  data-img={imageSrc}
                >
                  <img src={imageSrc} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-dark to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white relative inline-block">
                      <span className="relative z-10">{item.title}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-neon-primary transition-all duration-300 group-hover:w-full" />
                    </h3>
                    <p className="text-neon-primary mt-2">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div id="portfolio-modal" className="fixed inset-0 z-[100] hidden items-center justify-center p-4 sm:p-8">
        <div className="absolute inset-0 bg-neon-dark/95 backdrop-blur-xl" id="modal-overlay" />
        <div className="glass-card relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl shadow-neon-strong animate-slide-up">
          <button id="modal-close" className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:text-neon-primary transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="h-64 sm:h-96 relative">
            <img
              id="modal-img"
              src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
              alt="Project Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neon-card to-transparent" />
          </div>
          <div className="p-8 space-y-6">
            <h3 id="modal-title" className="text-4xl font-bold" />
            <div className="flex flex-wrap gap-2" id="modal-tech" />
            <p id="modal-desc" className="text-lg text-gray-300 leading-relaxed" />
            <div className="pt-6">
              <a
                href="#"
                className="btn-primary inline-flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Dummy Link");
                }}
              >
                Live Preview
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
