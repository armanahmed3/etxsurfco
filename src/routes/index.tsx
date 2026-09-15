import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { BoatCard } from "@/components/boat-card";
import { HeroSlider } from "@/components/hero-slider";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/use-catalog";
import { reviews, services } from "@/data/content";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({ component: Home });

const heroSlides = [
  {
    src: "/images/site/hero-wake.jpg",
    alt: "Wake surf boat on an East Texas lake",
    caption: "On the water",
  },
  {
    src: "/images/site/hero-original.jpg",
    alt: "Supra SL throwing a surf wake — from the ETX Surf Co homepage",
    caption: "From the lot",
  },
  {
    src: "/images/site/hero-surf.jpg",
    alt: "Wakesurfer riding a golden-hour curl behind a tower boat",
    caption: "Surf season",
  },
  {
    src: "/images/site/hero-sunset.jpg",
    alt: "Malibu wake boat at sunset on a Texas lake",
    caption: "Golden hour",
  },
];

function Home() {
  const { boats } = useCatalog();
  const featured = boats.filter((b) => b.featured).slice(0, 8);
  return (
    <>
      <section className="relative min-h-[88dvh] bg-navy text-cream flex items-end overflow-hidden">
        <HeroSlider slides={heroSlides} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-24 pt-32 w-full">
          <p className="text-xs uppercase tracking-[0.28em] text-foam">
            Whitehouse, Texas · Lake country
          </p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl max-w-3xl leading-[0.95]">
            Your perfect ride lives on this lot.
          </h1>
          <p className="mt-5 max-w-xl text-foam text-lg leading-relaxed">
            New and pre-owned Malibu, Axis, Supra, and Thor. Factory service,
            OEM parts, and financing — five minutes off Highway 110.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/inventory"
              className="h-12 px-6 rounded-lg bg-teal text-cream font-medium inline-flex items-center gap-2 hover:bg-teal-2"
            >
              Shop inventory
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/schedule"
              className="h-12 px-6 rounded-lg border border-cream/30 text-cream font-medium inline-flex items-center hover:bg-cream/10"
            >
              Schedule a viewing
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/inventory/new", label: "Shop new inventory", k: "New" },
            { to: "/inventory/used", label: "Shop pre-owned", k: "Used" },
            { to: "/service", label: "Service department", k: "Service" },
            { to: "/financing", label: "Get financing", k: "Finance" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group px-6 py-7 border-t sm:border-t-0 sm:border-l first:border-l-0 border-line-dark hover:bg-navy-3"
            >
              <p className="text-[11px] uppercase tracking-widest text-teal">
                {item.k}
              </p>
              <p className="mt-2 font-display text-xl text-cream group-hover:text-foam">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-teal">
                Featured boats
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">
                On the lot this week
              </h2>
            </div>
            <Link to="/inventory" className="text-sm font-medium text-teal inline-flex items-center gap-1">
              View all inventory <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((b) => (
              <BoatCard key={b.id} boat={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={s.href}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-navy"
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 size-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-display text-2xl text-cream">{s.title}</h3>
                <p className="mt-1 text-sm text-foam">{s.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy text-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-teal">
            Certified marine care
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl max-w-2xl">
            Boat sales & service under one roof
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Sales",
                body: "New and pre-owned inventory sized for East Texas lakes. We help you narrow the list until it's the right fit — not the first fit.",
                to: "/inventory",
              },
              {
                icon: Wrench,
                title: "Service",
                body: "Factory-trained techs who treat wakesurf boats, mud boats, and bowriders like they will be back on the water this weekend.",
                to: "/service",
              },
              {
                icon: Shield,
                title: "Parts",
                body: "OEM parts and accessories. If it is not on the shelf, we order it. Brenda's desk is famous for finding the odd piece fast.",
                to: "/parts",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="rounded-xl border border-line-dark bg-navy-2 p-6 hover:border-teal"
              >
                <c.icon className="size-6 text-teal" />
                <h3 className="mt-4 font-display text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-foam leading-relaxed">{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-teal">
              Welcome to ETX Surf Co
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              A cut above the rest — on purpose.
            </h2>
            <div className="mt-5 space-y-4 text-ink-soft leading-relaxed whitespace-pre-line">
              {site.welcome}
            </div>
            <Button asChild className="mt-6" size="lg">
              <Link to="/about">Meet the desk</Link>
            </Button>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy">
            <img
              src="/images/site/hero-dock.jpg"
              alt="Wake boat at a Texas lake dock"
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-6">
            Brands on the lot
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {site.brands.map((b) => (
              <span key={b} className="font-display text-xl text-ink-soft">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-teal">
                Five-star desk
              </p>
              <h2 className="mt-2 font-display text-3xl">What customers say</h2>
            </div>
            <Link to="/reviews" className="text-sm text-teal font-medium">
              Read all
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((r) => (
              <blockquote
                key={r.id}
                className="rounded-xl border border-line bg-cream p-6"
              >
                <div className="flex gap-1 text-teal" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  “{r.body}”
                </p>
                <footer className="mt-4 text-sm font-medium">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-line">
          <div className="bg-navy text-cream p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-teal">
              Visit us
            </p>
            <h2 className="mt-2 font-display text-3xl">Come see the lot</h2>
            <p className="mt-4 text-foam flex items-start gap-2">
              <MapPin className="size-4 mt-1 shrink-0" />
              {site.fullAddress}
            </p>
            <p className="mt-3 text-foam">
              Convenient to Jacksonville, Longview, Dallas, and Fort Worth.
            </p>
            <a
              href={`tel:9034713240`}
              className="mt-6 inline-flex h-12 px-5 rounded-lg bg-teal text-cream font-medium items-center"
            >
              {site.phoneDisplay}
            </a>
            <Link
              to="/hours"
              className="mt-3 ml-3 inline-flex h-12 px-5 rounded-lg border border-cream/20 items-center text-cream"
            >
              Hours & map
            </Link>
          </div>
          <iframe
            title="Map to ETX Surf Co"
            src={site.mapEmbed}
            className="w-full min-h-72 border-0"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
