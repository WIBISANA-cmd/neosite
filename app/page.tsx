/* eslint-disable @next/next/no-img-element */
"use client";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Works } from "../components/Works";
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const throttle = (func: (...args: any[]) => void, limit: number) => {
      let inThrottle: ReturnType<typeof setTimeout> | null = null;
      return function (...args: any[]) {
        if (!inThrottle) {
          func(...args);
          inThrottle = setTimeout(() => {
            inThrottle = null;
          }, limit);
        }
      };
    };

    const navbar = document.getElementById("navbar");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal-hidden");
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = document.querySelectorAll<HTMLElement>(".nav-link");
    const countUpElements = document.querySelectorAll<HTMLElement>(".count-up");
    const tiltCards = document.querySelectorAll<HTMLElement>("[data-tilt]");
    const spotlight = document.getElementById("cursor-spotlight");
    const serviceFilterBtns = document.querySelectorAll<HTMLElement>(".service-filter-btn");
    const serviceItems = document.querySelectorAll<HTMLElement>("#services-grid > div");
    const workFilterBtns = document.querySelectorAll<HTMLElement>(".work-filter-btn");
    const workItems = document.querySelectorAll<HTMLElement>(".work-item");
    const modal = document.getElementById("portfolio-modal");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalCloseBtn = document.getElementById("modal-close");
    const slides = document.querySelectorAll<HTMLElement>(".testimonial-slide");
    const dots = document.querySelectorAll<HTMLButtonElement>("#testimonial-dots button");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    const carouselContainer = document.getElementById("testimonial-carousel");
    const faqItems = document.querySelectorAll<HTMLElement>(".faq-item");
    const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
    const toastContainer = document.getElementById("toast-container");
    const backToTopBtn = document.getElementById("back-to-top");
    let isMenuOpen = false;
    let slideInterval: ReturnType<typeof setInterval> | undefined;
    let statsObserver: IntersectionObserver | null = null;
    let revealObserver: IntersectionObserver | null = null;
    let activeSectionObserver: IntersectionObserver | null = null;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu?.classList.toggle("translate-x-full", !isMenuOpen);
      if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = isMenuOpen
          ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>`;
      }
    };

    mobileMenuBtn?.addEventListener("click", toggleMenu);
    mobileNavLinks.forEach((link) => link.addEventListener("click", toggleMenu));

    const onScrollNavbar = throttle(() => {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add(
          "bg-neon-dark/80",
          "backdrop-blur-lg",
          "border-b",
          "border-white/5",
          "py-2"
        );
        navbar.classList.remove("bg-transparent", "py-4");
      } else {
        navbar.classList.add("bg-transparent", "py-4");
        navbar.classList.remove(
          "bg-neon-dark/80",
          "backdrop-blur-lg",
          "border-b",
          "border-white/5",
          "py-2"
        );
      }
    }, 100);
    window.addEventListener("scroll", onScrollNavbar);

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver?.observe(el));

    activeSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const currentId = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("nav-link-active", link.getAttribute("href") === `#${currentId}`);
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => activeSectionObserver?.observe(section));

    const startCountUp = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target.toString();
          clearInterval(timer);
        } else {
          el.textContent = current.toString();
        }
      }, 16);
    };

    statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUpElements.forEach((el) => startCountUp(el));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    const statsContainer = document.querySelector(".grid-cols-2.gap-6");
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }

    const onMouseMove = throttle((e: MouseEvent) => {
      if (spotlight) {
        spotlight.style.setProperty("--x", `${e.clientX}px`);
        spotlight.style.setProperty("--y", `${e.clientY}px`);
      }

      tiltCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    }, 20);
    document.addEventListener("mousemove", onMouseMove);

    tiltCards.forEach((card) => {
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    });

    const setupFiltering = (
      filterBtns: NodeListOf<HTMLElement>,
      items: NodeListOf<HTMLElement>
    ) => {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterBtns.forEach((b) =>
            b.classList.remove(
              "active",
              "bg-neon-primary/10",
              "border-neon-primary/50",
              "text-neon-primary"
            )
          );
          btn.classList.add("active", "bg-neon-primary/10", "border-neon-primary/50", "text-neon-primary");
          const filterValue = btn.getAttribute("data-filter");

          items.forEach((item) => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
              item.style.display = "block";
              setTimeout(() => item.classList.add("reveal-visible"), 50);
            } else {
              item.style.display = "none";
              item.classList.remove("reveal-visible");
            }
          });
        });
      });
    };
    setupFiltering(serviceFilterBtns, serviceItems);
    setupFiltering(workFilterBtns, workItems);

    const openModal = (item: HTMLElement) => {
      const imgEl = document.getElementById("modal-img") as HTMLImageElement | null;
      const titleEl = document.getElementById("modal-title");
      const descEl = document.getElementById("modal-desc");
      const techContainer = document.getElementById("modal-tech");

      if (!imgEl || !titleEl || !descEl || !techContainer || !modal) return;

      imgEl.src = item.getAttribute("data-img") || "";
      titleEl.textContent = item.getAttribute("data-title") || "";
      descEl.textContent = item.getAttribute("data-desc") || "";
      const techStack = (item.getAttribute("data-tech") || "").split(",");
      techContainer.innerHTML = "";
      techStack.forEach((tech) => {
        techContainer.innerHTML += `<span class="px-3 py-1 rounded-full bg-neon-primary/10 border border-neon-primary/30 text-sm text-neon-primary">${tech.trim()}</span>`;
      });
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    };

    workItems.forEach((item) => item.addEventListener("click", () => openModal(item)));
    modalCloseBtn?.addEventListener("click", closeModal);
    modalOverlay?.addEventListener("click", closeModal);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) closeModal();
    };
    document.addEventListener("keydown", onKeyDown);

    let currentSlide = 0;
    const showSlide = (index: number) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === index);
        slide.classList.toggle("opacity-0", i !== index);
        slide.classList.toggle("translate-x-0", i === index);
        slide.classList.toggle("translate-x-full", i > index);
        slide.classList.toggle("-translate-x-full", i < index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-neon-primary", i === index);
        dot.classList.toggle("bg-white/20", i !== index);
      });
      currentSlide = index;
    };

    const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
    const prevSlideFn = () => showSlide((currentSlide - 1 + slides.length) % slides.length);
    const startSlideTimer = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };
    const stopSlideTimer = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      stopSlideTimer();
      startSlideTimer();
    });
    prevBtn?.addEventListener("click", () => {
      prevSlideFn();
      stopSlideTimer();
      startSlideTimer();
    });
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        showSlide(i);
        stopSlideTimer();
        startSlideTimer();
      })
    );
    carouselContainer?.addEventListener("mouseenter", stopSlideTimer);
    carouselContainer?.addEventListener("mouseleave", startSlideTimer);
    if (slides.length) startSlideTimer();

    faqItems.forEach((item) => {
      const header = item.querySelector<HTMLButtonElement>("button");
      const content = item.querySelector<HTMLElement>(".faq-content");
      const icon = item.querySelector<HTMLElement>(".faq-icon");
      if (!header || !content || !icon) return;

      header.addEventListener("click", () => {
        const isOpen = content.style.maxHeight;
        faqItems.forEach((otherItem) => {
          const otherContent = otherItem.querySelector<HTMLElement>(".faq-content");
          const otherIcon = otherItem.querySelector<HTMLElement>(".faq-icon");
          if (otherContent) otherContent.style.maxHeight = "";
          otherIcon?.classList.remove("rotate-180", "text-neon-secondary");
        });

        if (!isOpen) {
          content.style.maxHeight = `${content.scrollHeight}px`;
          icon.classList.add("rotate-180", "text-neon-secondary");
        }
      });
    });

    const showToast = (message: string, type: "success" | "error" = "success") => {
      if (!toastContainer) return;
      const toast = document.createElement("div");
      toast.className = `glass-card p-4 rounded-xl border-l-4 shadow-neon-glow flex items-center gap-3 animate-fade-in ${
        type === "success" ? "border-neon-primary text-neon-primary" : "border-red-500 text-red-500"
      }`;
      toast.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                type === "success" ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"
              }" />
          </svg>
          <p class="font-medium">${message}</p>
      `;
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.classList.add("opacity-0", "translate-x-full");
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    };

    contactForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button[type='submit']") as HTMLButtonElement | null;
      if (!btn) return;
      const originalText = btn.textContent || "";
      btn.textContent = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        showToast("Message sent successfully! We will contact you soon.");
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });

    const backToTopScroll = throttle(() => {
      if (!backToTopBtn) return;
      if (window.scrollY > 500) {
        backToTopBtn.classList.remove("opacity-0", "invisible");
      } else {
        backToTopBtn.classList.add("opacity-0", "invisible");
      }
    }, 200);
    window.addEventListener("scroll", backToTopScroll);
    backToTopBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    return () => {
      window.removeEventListener("scroll", onScrollNavbar);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", backToTopScroll);
      mobileMenuBtn?.removeEventListener("click", toggleMenu);
      mobileNavLinks.forEach((link) => link.removeEventListener("click", toggleMenu));
      tiltCards.forEach((card) => {
        card.replaceWith(card.cloneNode(true));
      });
      workItems.forEach((item) => item.replaceWith(item.cloneNode(true)));
      modalCloseBtn?.removeEventListener("click", closeModal);
      modalOverlay?.removeEventListener("click", closeModal);
      document.removeEventListener("keydown", onKeyDown);
      nextBtn?.replaceWith(nextBtn.cloneNode(true));
      prevBtn?.replaceWith(prevBtn.cloneNode(true));
      carouselContainer?.replaceWith(carouselContainer.cloneNode(true));
      faqItems.forEach((item) => item.replaceWith(item.cloneNode(true)));
      contactForm?.replaceWith(contactForm.cloneNode(true));
      backToTopBtn?.replaceWith(backToTopBtn.cloneNode(true));
      if (slideInterval) clearInterval(slideInterval);
      statsObserver?.disconnect();
      revealObserver?.disconnect();
      activeSectionObserver?.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-neon-dark text-gray-300">
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise-pattern opacity-40 mix-blend-overlay" />
      <div
        id="cursor-spotlight"
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background:
            "radial-gradient(600px at var(--x, 50%) var(--y, 50%), rgba(0, 247, 255, 0.07) 0%, transparent 80%)",
        }}
      />

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Works />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <div id="toast-container" className="fixed bottom-4 right-4 z-[60] space-y-4" />
    </div>
  );
}
