"use client";

import { useEffect, useRef, useState } from "react";
import type { ContactOffering } from "../lib/cmsDefaults";

type Props = {
  heading: string;
  email: string;
  address: string;
  offerings: ContactOffering[];
};

export function Contact({ heading, email, address, offerings }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const card = cardRefs.current[activeIndex];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  const go = (step: number) => {
    setActiveIndex((prev) => Math.min(Math.max(prev + step, 0), offerings.length - 1));
  };

  const gradients = [
    "linear-gradient(135deg, rgba(3, 233, 244, 0.35), rgba(0, 102, 255, 0.5))",
    "linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(3, 233, 244, 0.45))",
    "linear-gradient(135deg, rgba(0, 102, 255, 0.35), rgba(3, 233, 244, 0.35))",
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-primary/10 to-transparent -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 reveal-hidden">
          <h2 className="text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilih jasa terbaik untuk kebutuhan bisnismu. Setiap paket bisa disesuaikan sesuai kebutuhan tim.
          </p>
        </div>
        <div className="pricing-slider reveal-hidden">
          <div className="pricing-head">
            <div>
              <p className="text-sm text-gray-400">Kontak langsung</p>
              <p className="text-white text-sm">{email} · {address}</p>
            </div>
            <div className="pricing-controls">
              <button className="pricing-nav-btn" onClick={() => go(-1)} disabled={activeIndex === 0} aria-label="Prev">
                ‹
              </button>
              <button
                className="pricing-nav-btn"
                onClick={() => go(1)}
                disabled={activeIndex === offerings.length - 1}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
          <div className="pricing-track">
            {offerings.map((offer, idx) => (
              <article
                key={offer.title}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="pricing-card"
                data-active={activeIndex === idx ? "true" : undefined}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div className="pricing-card__bg" style={{ backgroundImage: gradients[idx % gradients.length] }} />
                <div className="pricing-card__content">
                  <div className="pricing-card__thumb">
                    <span className="pricing-card__price">{offer.price}</span>
                  </div>
                  <div>
                    <h3 className="pricing-card__title">{offer.title}</h3>
                    <p className="pricing-card__desc">{offer.desc}</p>
                    <button className="pricing-card__btn" type="button">
                      Lihat detail
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="pricing-dots">
            {offerings.map((_, idx) => (
              <button
                key={`pricing-dot-${idx}`}
                type="button"
                className={`pricing-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
