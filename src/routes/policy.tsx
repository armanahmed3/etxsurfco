import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/policy")({ component: Page });

function Page() {
  return (
    <>
      <PageHero kicker="Policy" title="Dealership policy" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-4 text-ink-soft leading-relaxed">
        <p>
          Prices, inventory, and promotions at ETX Surf Co are subject to change without
          notice. Photographs may show options not included on the unit in Whitehouse.
          A written buyer’s order is the only binding statement of equipment and price.
        </p>
        <p>
          We make every effort to keep hours, contact details, and stock numbers accurate.
          If something on the site disagrees with the desk, the desk wins — call
          (903) 471-3240.
        </p>
      </div>
    </>
  );
}
