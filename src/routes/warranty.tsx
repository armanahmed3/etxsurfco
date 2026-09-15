import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/warranty")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="FPC Premium Marine Protection"
        title="Coverage that wraps around the factory warranty"
        lede="Engine, accessories, trailer, and roadside. Brenda Velasco handles contracts from the Whitehouse office."
        image="/images/site/service.jpg"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-10">
        <section>
          <h2 className="font-display text-2xl">Engine coverage</h2>
          <p className="mt-2 text-ink-soft">
            Outboard, inboard, stern drive, diesel, and personal watercraft.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-line bg-cream p-6">
              <h3 className="font-display text-xl">New engines</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>Exclusionary coverage available</li>
                <li>Up to 8-year terms designed to wrap around the manufacturer’s engine warranty</li>
                <li>Deductibles: $50, $100, $250, $500 — 50% reduced if returned to the selling dealer</li>
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-cream p-6">
              <h3 className="font-display text-xl">Pre-owned engines</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>Named component coverage</li>
                <li>Eligibility: current through 13 previous model years</li>
                <li>Up to 5-year terms</li>
                <li>Deductibles: $100, $250, $500 — 50% reduced at selling dealer</li>
                <li>Post-sale deductible: $250</li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-display text-2xl">Accessory packages</h2>
          <p className="mt-2 text-ink-soft">
            Bass fishing, trophy fishing, cruiser fishing, ski boat, runabout, pontoon, navigation, cruiser.
            All packages include trailer coverage and emergency roadside assistance for the trailer and tow vehicle.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Additional benefits</h2>
          <dl className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["Towing", "Up to $300 per occurrence"],
              ["Hoist / lift out", "Up to $300 per occurrence"],
              ["Pick-up and delivery", "Up to $150 per occurrence"],
              ["Dockside assistance", "Up to $150 per occurrence"],
              ["Sea trial labor", "Up to $100 per occurrence"],
              ["Travel expenses", "Up to $150 per day for 3 days"],
              ["Blocking", "Up to $250 per occurrence"],
              ["Tear down / accessory access", "Up to $500 per occurrence"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-cream px-4 py-3">
                <dt className="font-medium">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted">
            Certain additional benefits may not be available in some states. See contract for exact terms.
          </p>
        </section>
        <section className="rounded-xl bg-navy text-cream p-6">
          <p className="text-xs uppercase tracking-widest text-teal">Office manager</p>
          <h3 className="font-display text-2xl mt-1">Brenda Velasco</h3>
          <p className="text-foam mt-2">
            317 State Highway 110 S, Whitehouse, TX 75791
            <br />
            Cell 903-372-3420
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex h-11 px-5 rounded-md bg-teal text-cream font-medium items-center"
          >
            Contact us today
          </Link>
        </section>
      </div>
    </>
  );
}
