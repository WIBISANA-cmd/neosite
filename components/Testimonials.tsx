import { useEffect, useRef, useState } from "react";
import { Testimonial } from "../lib/cmsDefaults";

type Props = { title: string; items: Testimonial[] };

export function Testimonials({ title, items }: Props) {
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
  };

  const stopAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!items.length) return;
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    startAuto();
  };

  const next = () => goTo((activeIndex + 1) % items.length);
  const prev = () => goTo((activeIndex - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="section-padding bg-neon-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden">
          <h2 className="text-4xl font-bold mb-4">
            {firstWords} <span className="text-neon-primary">{lastWord}</span>
          </h2>
          <p className="text-gray-400">Trusted by visionaries across the globe.</p>
        </div>

        <div
          className="relative max-w-5xl mx-auto glass-card p-8 sm:p-12 neon-border reveal-hidden"
          id="testimonial-carousel"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-neon-primary/5 via-transparent to-neon-secondary/5 rounded-2xl" />
          <div className="overflow-hidden relative min-h-[260px] sm:min-h-[220px]">
            {items.map((item, idx) => (
              <div
                key={item.name + idx}
                className={`testimonial-slide absolute inset-0 transition-all duration-500 ease-in-out flex flex-col justify-center ${
                  idx === activeIndex ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-neon-primary">
                    <div className="w-10 h-10 rounded-full bg-neon-primary/10 border border-neon-primary/30 flex items-center justify-center shadow-neon-glow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.56 9.157c0 .741-.136 1.424-.409 2.047-.273.623-.699 1.33-1.278 2.12-.476.661-.804 1.195-.985 1.601-.18.406-.27.795-.27 1.166 0 .304.097.555.29.755.193.199.46.299.799.299.356 0 .64-.126.853-.379.214-.252.32-.58.32-.983 0-.194-.05-.385-.15-.573-.092-.196-.138-.363-.138-.501 0-.237.078-.474.235-.711.165-.237.42-.533.764-.887.39-.406.703-.768.938-1.085.244-.316.453-.669.626-1.057.183-.396.275-.838.275-1.324 0-.677-.206-1.229-.617-1.655-.411-.434-.97-.651-1.679-.651-.475 0-.898.08-1.27.239a2.42 2.42 0 00-.925.689 3.06 3.06 0 00-.568 1.05c-.135.411-.203.873-.203 1.385 0 .356.04.693.12 1.012.079.31.195.61.349.901.083.168.124.309.124.423 0 .135-.067.265-.2.39-.135.116-.296.175-.485.175-.32 0-.6-.151-.837-.454a3.466 3.466 0 01-.515-.992A4.638 4.638 0 018 9.64c0-.709.112-1.371.335-1.986.223-.624.54-1.167.95-1.63a4.05 4.05 0 011.458-1.048A4.72 4.72 0 0112.151 4c.598 0 1.127.1 1.589.301.47.193.839.47 1.105.833.275.356.462.782.561 1.278.108.488.163 1.03.163 1.627zm8 0c0 .741-.136 1.424-.409 2.047-.273.623-.699 1.33-1.278 2.12-.476.661-.804 1.195-.985 1.601-.18.406-.27.795-.27 1.166 0 .304.097.555.29.755.193.199.46.299.799.299.356 0 .64-.126.853-.379.214-.252.32-.58.32-.983 0-.194-.05-.385-.15-.573-.092-.196-.138-.363-.138-.501 0-.237.078-.474.235-.711.165-.237.42-.533.764-.887.39-.406.703-.768.938-1.085.244-.316.453-.669.626-1.057.183-.396.275-.838.275-1.324 0-.677-.206-1.229-.617-1.655-.411-.434-.97-.651-1.679-.651-.475 0-.898.08-1.27.239a2.42 2.42 0 00-.925.689 3.06 3.06 0 00-.568 1.05c-.135.411-.203.873-.203 1.385 0 .356.04.693.12 1.012.079.31.195.61.349.901.083.168.124.309.124.423 0 .135-.067.265-.2.39-.135.116-.296.175-.485.175-.32 0-.6-.151-.837-.454a3.466 3.466 0 01-.515-.992A4.638 4.638 0 0116 9.64c0-.709.112-1.371.335-1.986.223-.624.54-1.167.95-1.63a4.05 4.05 0 011.458-1.048A4.72 4.72 0 0120.151 4c.598 0 1.127.1 1.589.301.47.193.839.47 1.105.833.275.356.462.782.561 1.278.108.488.163 1.03.163 1.627z" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1 text-neon-primary">
                      {Array.from({ length: item.rating || 0 }).map((_, starIdx) => (
                        <svg key={`star-${idx}-${starIdx}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-xl sm:text-2xl font-medium italic text-white leading-relaxed">"{item.message}"</p>

                  <div className="flex items-center gap-4">
                    <img
                      src={`https://source.unsplash.com/random/120x120?portrait,${encodeURIComponent(item.name)}`}
                      alt={item.name}
                      className="w-14 h-14 rounded-full border-2 border-neon-primary object-cover shadow-neon-glow/40"
                    />
                    <div className="space-y-1">
                      <h5 className="font-bold text-white">{item.name}</h5>
                      <p className="text-sm text-gray-400">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2" id="testimonial-dots">
              {items.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => goTo(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeIndex ? "bg-neon-primary shadow-neon-glow w-4" : "bg-white/20 hover:bg-neon-primary/50"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                id="prev-slide"
                onClick={prev}
                className="p-2 rounded-full border border-white/10 hover:border-neon-primary/50 hover:text-neon-primary transition-all"
                aria-label="Previous Slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                id="next-slide"
                onClick={next}
                className="p-2 rounded-full border border-white/10 hover:border-neon-primary/50 hover:text-neon-primary transition-all"
                aria-label="Next Slide"
              >
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
