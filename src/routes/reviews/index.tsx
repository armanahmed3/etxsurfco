import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Select } from "@/components/ui/input";
import { reviews } from "@/data/content";

export const Route = createFileRoute("/reviews/")({ component: Page });

function Page() {
  const [sort, setSort] = useState("newest");
  const list = useMemo(() => {
    const rows = [...reviews];
    if (sort === "oldest") rows.reverse();
    return rows;
  }, [sort]);

  return (
    <>
      <PageHero
        kicker="Testimonials"
        title="What our customers are saying"
        lede="A 5-star desk — sales, parts, and the shop. Leave yours if we earned it."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted tabular-nums">{list.length} reviews · 5 star overall</p>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="w-40">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </Select>
        </div>
        <div className="space-y-4">
          {list.map((r) => (
            <article key={r.id} className="rounded-xl border border-line bg-cream p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">{r.name}</h3>
                <span className="text-xs text-muted tabular-nums">
                  {new Date(r.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-xs text-teal font-semibold">5 star overall rating</p>
              <p className="mt-3 text-ink-soft leading-relaxed">{r.body}</p>
            </article>
          ))}
        </div>
        <Link
          to="/reviews/submit"
          className="mt-8 inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
        >
          Submit a testimonial
        </Link>
      </div>
    </>
  );
}
