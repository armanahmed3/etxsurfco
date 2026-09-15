import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/service/ceramic")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Ceramic coating"
        title="Water beads. Color stays. Wash time drops."
        lede="A professional ceramic layer on gelcoat and glass. Hydrophobic, UV-stable, and worth it if the boat lives outside."
        image="/images/site/ceramic.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-5 text-ink-soft leading-relaxed">
        <p>
          We correct the surface first — coating over oxidation is just expensive haze.
          Then we lay a marine-grade ceramic and walk you through the aftercare.
        </p>
        <p>Ask the shop for current package pricing. Every hull is quoted after an inspection.</p>
        <Link
          to="/service/appointments"
          className="inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
        >
          Request a ceramic quote
        </Link>
      </div>
    </>
  );
}
