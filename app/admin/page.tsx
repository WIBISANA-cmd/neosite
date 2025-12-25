/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import AdminChatPanel from "./components/AdminChatPanel";
import { Input, ListEditor, SectionCard } from "./components/ui";
import { CMSData, ContactOffering, defaultCmsData, FAQItem, FooterLink, HeroStat, NavLink, ServiceItem, Testimonial, TimelineStep, WorkItem } from "../../lib/cmsDefaults";

type AdminSection = keyof CMSData | "dashboard";

const STORAGE_KEY = "neosite_cms_data";

export default function AdminPage() {
  const [data, setData] = useState<CMSData>(defaultCmsData);
  const [active, setActive] = useState<AdminSection>("dashboard");
  const [status, setStatus] = useState("All changes saved");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({
          ...defaultCmsData,
          ...parsed,
          contact: {
            ...defaultCmsData.contact,
            ...parsed.contact,
          },
        });
      } catch {
        // ignore corrupted storage
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setStatus("Saving...");
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStatus("All changes saved");
    }, 400);
    return () => clearTimeout(timeout);
  }, [data]);

  const sectionTitle = useMemo(
    () => ({
      dashboard: "Dashboard",
      global: "Global Settings",
      navbar: "Navigation Bar",
      hero: "Hero Section",
      services: "Services",
      works: "Portfolio & Works",
      about: "About & Values",
      timeline: "Timeline",
      testimonials: "Testimonials",
      faq: "FAQ",
      contact: "Service Pricing",
      footer: "Footer",
      seo: "SEO",
    }),
    []
  );
  const cmsSections: AdminSection[] = useMemo(
    () => ["global", "navbar", "hero", "services", "works", "about", "timeline", "testimonials", "faq", "contact", "footer", "seo"],
    []
  );

  const update = (updater: (draft: CMSData) => void) => {
    setData((prev) => {
      const next = structuredClone(prev);
      updater(next);
      return next;
    });
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const anchor = document.createElement("a");
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", "neosite_cms_export.json");
    anchor.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        if (!json.global) throw new Error("Invalid");
        setData(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const resetData = () => {
    if (confirm("Reset CMS data to defaults?")) setData(defaultCmsData);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      // ignore
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-neon-dark text-gray-200">
      <div className="flex h-screen">
        <aside className="w-64 glass-card border-r border-white/5 p-4 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2 font-display font-bold text-xl tracking-wide text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-secondary to-neon-primary flex items-center justify-center text-neon-dark">
              N
            </div>
            CMS
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => setActive("dashboard")}
              className={`sidebar-link w-full text-left ${active === "dashboard" ? "active" : ""}`}
            >
              {sectionTitle.dashboard}
            </button>
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setCmsOpen((v) => !v)}
                className="sidebar-link w-full text-left justify-between pr-3"
              >
                <span className="flex items-center gap-2">CMS</span>
                <span className={`transition-transform ${cmsOpen ? "rotate-90" : ""}`}>›</span>
              </button>
              {cmsOpen && (
                <div className="bg-white/5 border-t border-white/10">
                  {cmsSections.map((key) => (
                    <button
                      key={key}
                      onClick={() => setActive(key)}
                      className={`sidebar-link w-full text-left pl-8 ${active === key ? "active" : ""}`}
                    >
                      {sectionTitle[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col" onClick={() => showUserMenu && setShowUserMenu(false)}>
          <header className="glass-card relative z-20 h-16 border-b border-white/5 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-display text-white">{sectionTitle[active]}</h2>
              <span className="text-xs text-gray-500">{status}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary text-xs px-3 py-1.5" onClick={downloadJson}>
                Export JSON
              </button>
              <button
                className="btn-secondary text-xs px-3 py-1.5"
                onClick={() => fileInputRef.current?.click()}
              >
                Import JSON
              </button>
              <button className="btn-danger text-xs px-3 py-1.5" onClick={resetData}>
                Reset
              </button>
              <AdminChatPanel />
              <div className="relative">
                <button
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-neon-secondary to-neon-primary text-sm font-bold text-neon-dark flex items-center justify-center shadow-neon-glow border border-white/10"
                  onClick={() => setShowUserMenu((v) => !v)}
                  aria-label="User menu"
                >
                  AD
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-40 glass-card border border-white/10 rounded-xl shadow-2xl z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/5"
                      onClick={() => {
                        setShowUserMenu(false);
                        alert("Profile coming soon");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {active === "dashboard" && <AdminDashboard />}
            {active === "global" && (
              <SectionCard title="Global">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Brand Name" value={data.global.brandName} onChange={(v) => update((d) => (d.global.brandName = v))} />
                  <Input label="Tagline" value={data.global.tagline} onChange={(v) => update((d) => (d.global.tagline = v))} />
                  <Input label="Accent" value={data.global.accent} onChange={(v) => update((d) => (d.global.accent = v))} />
                  <Input label="Email" value={data.global.email} onChange={(v) => update((d) => (d.global.email = v))} />
                  <Input label="Address" value={data.global.address} onChange={(v) => update((d) => (d.global.address = v))} />
                  <Input label="Twitter" value={data.global.social.twitter} onChange={(v) => update((d) => (d.global.social.twitter = v))} />
                  <Input label="LinkedIn" value={data.global.social.linkedin} onChange={(v) => update((d) => (d.global.social.linkedin = v))} />
                  <Input label="Instagram" value={data.global.social.instagram} onChange={(v) => update((d) => (d.global.social.instagram = v))} />
                </div>
              </SectionCard>
            )}

            {active === "navbar" && (
              <div className="space-y-4">
                <SectionCard title="Navbar Buttons">
                  <div className="grid md:grid-cols-4 gap-4">
                    <Input label="CTA Text" value={data.navbar.ctaText} onChange={(v) => update((d) => (d.navbar.ctaText = v))} />
                    <Input label="CTA Link" value={data.navbar.ctaLink} onChange={(v) => update((d) => (d.navbar.ctaLink = v))} />
                    <Input label="Sign In Text" value={data.navbar.signInText || ""} onChange={(v) => update((d) => (d.navbar.signInText = v))} />
                    <Input label="Sign In Link" value={data.navbar.signInLink || "/login"} onChange={(v) => update((d) => (d.navbar.signInLink = v))} />
                  </div>
                </SectionCard>
                <ListEditor<NavLink>
                  title="Nav Links"
                  items={data.navbar.links}
                  onChange={(items) => update((d) => (d.navbar.links = items))}
                  addItem={() => ({ label: "New Link", href: "#hero" })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Label" value={item.label} onChange={(v) => updateItem({ label: v })} />
                      <Input label="Href (#id)" value={item.href} onChange={(v) => updateItem({ href: v })} />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "hero" && (
              <div className="space-y-4">
                <SectionCard title="Hero Copy">
                  <div className="grid gap-4">
                    <Input label="Headline" value={data.hero.headline} textarea onChange={(v) => update((d) => (d.hero.headline = v))} />
                    <Input label="Subheadline" value={data.hero.subheadline} textarea onChange={(v) => update((d) => (d.hero.subheadline = v))} />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Primary CTA" value={data.hero.ctaPrimary} onChange={(v) => update((d) => (d.hero.ctaPrimary = v))} />
                      <Input label="Secondary CTA" value={data.hero.ctaSecondary} onChange={(v) => update((d) => (d.hero.ctaSecondary = v))} />
                    </div>
                  </div>
                </SectionCard>
                <ListEditor<HeroStat>
                  title="Stats"
                  items={data.hero.stats}
                  onChange={(items) => update((d) => (d.hero.stats = items))}
                  addItem={() => ({ value: "0", label: "Label" })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Value" value={item.value} onChange={(v) => updateItem({ value: v })} />
                      <Input label="Label" value={item.label} onChange={(v) => updateItem({ label: v })} />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "services" && (
              <div className="space-y-4">
                <SectionCard title="Services Header">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Title" value={data.services.title} onChange={(v) => update((d) => (d.services.title = v))} />
                    <Input label="Filters (comma separated keys)" value={data.services.filters} onChange={(v) => update((d) => (d.services.filters = v))} />
                    <Input label="Description" value={data.services.description} textarea onChange={(v) => update((d) => (d.services.description = v))} />
                  </div>
                </SectionCard>
                <ListEditor<ServiceItem>
                  title="Service Cards"
                  items={data.services.items}
                  onChange={(items) => update((d) => (d.services.items = items))}
                  addItem={() => ({ title: "New Service", icon: "code", desc: "Description", category: "development" })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} />
                      <Input label="Category Key" value={item.category} onChange={(v) => updateItem({ category: v })} />
                      <Input label="Icon" value={item.icon} onChange={(v) => updateItem({ icon: v })} />
                      <Input label="Description" value={item.desc} textarea onChange={(v) => updateItem({ desc: v })} />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "works" && (
              <div className="space-y-4">
                <SectionCard title="Works Header">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Title" value={data.works.title} onChange={(v) => update((d) => (d.works.title = v))} />
                    <Input label="Description" value={data.works.description} textarea onChange={(v) => update((d) => (d.works.description = v))} />
                  </div>
                </SectionCard>
                <ListEditor<WorkItem>
                  title="Portfolio Items"
                  items={data.works.items}
                  onChange={(items) => update((d) => (d.works.items = items))}
                  addItem={() => ({
                    title: "New Project",
                    category: "saas",
                    desc: "Description",
                    tags: "Tech",
                    img: "https://source.unsplash.com/random/800x600?technology",
                  })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} />
                      <Input label="Category" value={item.category} onChange={(v) => updateItem({ category: v })} />
                      <Input label="Description" value={item.desc} textarea onChange={(v) => updateItem({ desc: v })} />
                      <Input label="Tags" value={item.tags} onChange={(v) => updateItem({ tags: v })} />
                      <Input label="Image URL" value={item.img} onChange={(v) => updateItem({ img: v })} />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "about" && (
              <div className="space-y-4">
                <SectionCard title="About Content">
                  <div className="grid gap-4">
                    <Input label="Title" value={data.about.title} onChange={(v) => update((d) => (d.about.title = v))} />
                    <Input label="Content" value={data.about.content} textarea rows={5} onChange={(v) => update((d) => (d.about.content = v))} />
                  </div>
                </SectionCard>
                <ListEditor<string>
                  title="Values"
                  items={data.about.values}
                  onChange={(items) => update((d) => (d.about.values = items))}
                  addItem={() => "New Value"}
                  renderItem={(item, updateItem) => (
                    <Input label="Value" value={item} onChange={(v) => updateItem(v)} />
                  )}
                />
              </div>
            )}

            {active === "timeline" && (
              <ListEditor<TimelineStep>
                title="Timeline Steps"
                items={data.timeline.steps}
                onChange={(items) => update((d) => (d.timeline.steps = items))}
                addItem={() => ({ title: "New Step", desc: "Description" })}
                renderItem={(item, updateItem) => (
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} />
                    <Input label="Description" value={item.desc} textarea onChange={(v) => updateItem({ desc: v })} />
                  </div>
                )}
              />
            )}

            {active === "testimonials" && (
              <div className="space-y-4">
                <SectionCard title="Testimonials Header">
                  <Input label="Title" value={data.testimonials.title} onChange={(v) => update((d) => (d.testimonials.title = v))} />
                </SectionCard>
                <ListEditor<Testimonial>
                  title="Testimonials"
                  items={data.testimonials.items}
                  onChange={(items) => update((d) => (d.testimonials.items = items))}
                  addItem={() => ({ name: "Client", role: "Role", message: "Message", rating: 5 })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Name" value={item.name} onChange={(v) => updateItem({ name: v })} />
                      <Input label="Role" value={item.role} onChange={(v) => updateItem({ role: v })} />
                      <Input label="Message" value={item.message} textarea onChange={(v) => updateItem({ message: v })} />
                      <Input
                        label="Rating"
                        value={item.rating}
                        type="number"
                        onChange={(v) => updateItem({ rating: Number(v) || 0 })}
                      />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "faq" && (
              <ListEditor<FAQItem>
                title="FAQ Items"
                items={data.faq.items}
                onChange={(items) => update((d) => (d.faq.items = items))}
                addItem={() => ({ q: "New Question", a: "Answer" })}
                renderItem={(item, updateItem) => (
                  <div className="grid gap-3">
                    <Input label="Question" value={item.q} onChange={(v) => updateItem({ q: v })} />
                    <Input label="Answer" value={item.a} textarea onChange={(v) => updateItem({ a: v })} />
                  </div>
                )}
              />
            )}

            {active === "contact" && (
              <div className="space-y-4">
                <SectionCard title="Service Pricing">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Heading" value={data.contact.heading} onChange={(v) => update((d) => (d.contact.heading = v))} />
                    <Input label="Recipient" value={data.contact.emailRecipient} onChange={(v) => update((d) => (d.contact.emailRecipient = v))} />
                    <Input label="Success Message" value={data.contact.successMessage} onChange={(v) => update((d) => (d.contact.successMessage = v))} />
                  </div>
                </SectionCard>
                <ListEditor<ContactOffering>
                  title="Service Offerings"
                  items={data.contact.offerings ?? defaultCmsData.contact.offerings}
                  onChange={(items) => update((d) => (d.contact.offerings = items))}
                  addItem={() => ({ title: "New Service", desc: "Describe the service", price: "Start from $0" })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-3 gap-3">
                      <Input label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} />
                      <Input label="Price" value={item.price} onChange={(v) => updateItem({ price: v })} />
                      <Input label="Description" value={item.desc} textarea onChange={(v) => updateItem({ desc: v })} />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "footer" && (
              <div className="space-y-4">
                <SectionCard title="Footer">
                  <Input label="Copyright" value={data.footer.copyright} onChange={(v) => update((d) => (d.footer.copyright = v))} />
                </SectionCard>
                <ListEditor<FooterLink>
                  title="Footer Links"
                  items={data.footer.links}
                  onChange={(items) => update((d) => (d.footer.links = items))}
                  addItem={() => ({ label: "Link", href: "#" })}
                  renderItem={(item, updateItem) => (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Label" value={item.label} onChange={(v) => updateItem({ label: v })} />
                      <Input label="Href" value={item.href} onChange={(v) => updateItem({ href: v })} />
                    </div>
                  )}
                />
              </div>
            )}

            {active === "seo" && (
              <SectionCard title="SEO">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Title" value={data.seo.title} onChange={(v) => update((d) => (d.seo.title = v))} />
                  <Input label="Description" value={data.seo.description} textarea onChange={(v) => update((d) => (d.seo.description = v))} />
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={data.seo.robotsIndex}
                      onChange={(e) => update((d) => (d.seo.robotsIndex = e.target.checked))}
                    />
                    Allow indexing
                  </label>
                </div>
              </SectionCard>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
