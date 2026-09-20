import { Link } from "@tanstack/react-router";
import { services } from "@/lib/services-data";
import { Reveal } from "@/components/site/Reveal";
import { Interactive3DCard } from "@/components/ui/Interactive3DCard";
import { CardConnectors } from "@/components/site/CardConnectors";

export function ServicesSection() {
  return (
    <section id="services" className="scene-3d mx-auto max-w-6xl px-5 py-20">
      <CardConnectors className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 90} className="h-full">
            <Interactive3DCard intensity={10} className="h-full">
              <article
                className={`panel card-beam group relative flex h-full flex-col overflow-hidden p-7 ${
                  i % 2 === 0 ? "card-3d" : "card-3d-alt"
                }`}
              >
                <div className="lift-3d flex items-center justify-between text-[11px] uppercase tracking-widest">
                  <span className="text-primary">{s.cat}</span>
                  <span className="text-muted-foreground">{s.metric}</span>
                </div>
                <h2 className="lift-3d mt-3 text-xl font-bold transition-colors group-hover:text-primary">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="chip-hover rounded-full border border-border px-3 py-1.5"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-auto pt-6 text-sm font-semibold text-primary">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    Get started with {s.title} →
                  </span>
                </Link>
              </article>
            </Interactive3DCard>
          </Reveal>
        ))}
      </CardConnectors>
    </section>
  );
}
