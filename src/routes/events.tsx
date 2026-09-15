import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { events } from "@/data/content";

export const Route = createFileRoute("/events")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Event calendar"
        title="Demo days, clinics, and lot sales"
        lede="Lake Palestine, Lake Tyler, and the Highway 110 shop. Dates are local — weather can move a water day."
        image="/images/site/hero-wake.jpg"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 grid gap-4">
        {events.map((e) => (
          <article key={e.id} className="rounded-xl border border-line bg-cream p-6 grid sm:grid-cols-[140px_1fr] gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal">{e.category}</p>
              <p className="mt-1 font-display text-xl tabular-nums">
                {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-muted">{e.time}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl">{e.title}</h2>
              <p className="mt-1 text-sm text-muted">{e.place}</p>
              <p className="mt-2 text-ink-soft">{e.body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
