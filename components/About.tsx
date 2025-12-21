import { TimelineStep } from "../lib/cmsDefaults";

type Props = {
  title: string;
  content: string;
  values: string[];
  steps: TimelineStep[];
};

export function About({ title, content, values, steps }: Props) {
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-secondary/10 rounded-full mix-blend-screen filter blur-[120px] -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 reveal-hidden">
            <h2 className="text-4xl font-bold">
              {firstWords} <span className="text-neon-primary">{lastWord}</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">{content}</p>
            <div className="flex flex-wrap gap-4">
              {values.map((value) => (
                <span key={value} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neon-primary shadow-neon-glow">
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="relative space-y-12 pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:h-[calc(100%-20px)] before:w-0.5 before:bg-gradient-to-b before:from-neon-primary before:to-neon-secondary/20 reveal-hidden">
            {steps.map((step, idx) => (
              <div
                key={step.title + idx}
                className={`relative timeline-item reveal-hidden ${idx === 1 ? "animation-delay-200" : idx === 2 ? "animation-delay-400" : idx === 3 ? "animation-delay-600" : ""}`}
              >
                <span className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-neon-dark border-2 border-neon-primary shadow-neon-glow z-10" />
                <h4 className="text-xl font-bold text-neon-primary">
                  {String(idx + 1).padStart(2, "0")}. {step.title}
                </h4>
                <p className="text-gray-400 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
