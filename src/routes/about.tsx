import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { staff as seedStaff } from "@/data/content";
import { listPublicStaff, type DeskStaff } from "@/lib/desk";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({ component: Page });

function Page() {
  const [people, setPeople] = useState<DeskStaff[]>([]);
  useEffect(() => {
    listPublicStaff().then(setPeople).catch(() => setPeople([]));
  }, []);
  const list = people.length
    ? people
    : seedStaff.map((s, i) => ({
        id: String(i),
        user_id: null,
        email: s.email ?? "",
        name: s.name,
        title: s.role,
        phone: "phone" in s ? (s as { phone?: string }).phone ?? null : null,
        photo: null,
        bio: s.blurb,
        role: "staff",
        can_access: 0,
      }));
  return (
    <>
      <PageHero
        kicker="About ETX Surf Co"
        title="The East Texas boat desk people actually recommend"
        lede="An authorized dealership serving Whitehouse and the lakes around Jacksonville, Longview, Dallas, and Fort Worth."
        image="/images/site/lot.jpg"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="space-y-4 text-ink-soft leading-relaxed whitespace-pre-line">
          {site.about}
        </div>
        <h2 className="mt-12 font-display text-3xl">The people</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {list.map((s) => (
            <article key={s.id || s.name} className="rounded-xl border border-line bg-cream p-5">
              <p className="text-xs uppercase tracking-widest text-teal">{s.title}</p>
              <h3 className="font-display text-xl mt-1">{s.name}</h3>
              {s.bio ? <p className="mt-2 text-sm text-ink-soft">{s.bio}</p> : null}
              {s.email ? (
                <a href={`mailto:${s.email}`} className="mt-2 block text-sm text-teal">
                  {s.email}
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-10 inline-flex h-12 px-6 rounded-lg bg-navy text-cream font-medium items-center"
        >
          Call us at {site.phoneDisplay} or come by today
        </Link>
      </div>
    </>
  );
}
