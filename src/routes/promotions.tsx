import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { promotions } from "@/data/content";

export const Route = createFileRoute("/promotions")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Manufacturer promotions"
        title="Offers on the water this season"
        lede="Boat, accessory, and repower programs. Dates move — call the desk if you want something locked."
        image="/images/site/hero-wake.jpg"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 grid gap-5">
        {promotions.map((p) => (
          <article key={p.id} className="rounded-xl border border-line bg-cream p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-teal">{p.kicker}</p>
            <h2 className="mt-1 font-display text-2xl">{p.title}</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">{p.body}</p>
            <p className="mt-4 text-xs text-muted">Expires {p.expires}</p>
          </article>
        ))}
        <Link
          to="/contact"
          className="h-12 rounded-lg bg-navy text-cream font-medium inline-flex items-center justify-center"
        >
          Ask about current pricing
        </Link>
      </div>
    </>
  );
}
