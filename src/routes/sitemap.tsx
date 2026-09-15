import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { boats } from "@/data/boats";

export const Route = createFileRoute("/sitemap")({ component: Page });

const pages = [
  ["/", "Home"],
  ["/inventory", "All inventory"],
  ["/inventory/new", "New boats"],
  ["/inventory/used", "Pre-owned"],
  ["/quote", "Get a quote"],
  ["/trade-in", "Value your trade"],
  ["/warranty", "Warranty"],
  ["/schedule", "Schedule a viewing"],
  ["/promotions", "Promotions"],
  ["/parts", "Parts"],
  ["/parts/request", "Parts request"],
  ["/service", "Service"],
  ["/service/appointments", "Service appointments"],
  ["/service/detailing", "Detailing"],
  ["/service/ceramic", "Ceramic coating"],
  ["/service/storage", "Storage & winterization"],
  ["/financing", "Financing"],
  ["/financing/prequalify", "Prequalify"],
  ["/about", "About"],
  ["/blog", "Blog"],
  ["/hours", "Map & hours"],
  ["/careers", "Careers"],
  ["/events", "Events"],
  ["/newsletter", "Newsletter"],
  ["/reviews", "Reviews"],
  ["/reviews/submit", "Submit a review"],
  ["/contact", "Contact"],
  ["/favorites", "Saved boats"],
  ["/compare", "Compare"],
  ["/policy", "Policy"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/accessibility", "Accessibility"],
] as const;

function Page() {
  return (
    <>
      <PageHero kicker="Site map" title="Every page on ETX Surf Co" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 grid md:grid-cols-2 gap-10">
        <ul className="space-y-2 text-sm">
          {pages.map(([href, label]) => (
            <li key={href}>
              <Link to={href} className="text-teal hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <h2 className="font-display text-xl mb-3">Inventory</h2>
          <ul className="space-y-2 text-sm">
            {boats.map((b) => (
              <li key={b.slug}>
                <Link
                  to="/inventory/$slug"
                  params={{ slug: b.slug }}
                  className="text-teal hover:underline"
                >
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
