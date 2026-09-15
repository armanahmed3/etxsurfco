import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/terms")({ component: Page });

function Page() {
  return (
    <>
      <PageHero kicker="Terms" title="Terms of use" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-4 text-ink-soft leading-relaxed">
        <p>
          This website is operated by ETX Surf Co, 317 State Highway 110 S, Whitehouse,
          TX 75791. Content is for information about inventory, service, and parts.
          It is not a consumer contract until you sign a buyer’s order or service RO.
        </p>
        <p>
          Price and availability may be incorrect. We are not obligated to honor a
          website price that is inaccurate. Vehicles are sold as described on the
          signed documents.
        </p>
        <p>This site is intended for adults. It is not directed at children under 13.</p>
        <p>Governing law: State of Texas, without regard to conflict-of-law rules.</p>
      </div>
    </>
  );
}
