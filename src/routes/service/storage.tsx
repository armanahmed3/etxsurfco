import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/service/storage")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Storage & winterization"
        title="Put it away right. Pull it in the spring ready."
        lede="Covered storage and a full winterization so East Texas cold snaps never touch your engine, ballast, or ballast bags."
        image="/images/site/storage.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-5 text-ink-soft leading-relaxed">
        <p>
          Fogging, systems drain, fuel treatment, battery care, and shrink or cover —
          depending on how you store. Wake boats with ballast need a different list
          than a Thor mud boat. We write the list to the hull.
        </p>
        <Link
          to="/service/appointments"
          className="inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
        >
          Reserve storage / winterize
        </Link>
      </div>
    </>
  );
}
