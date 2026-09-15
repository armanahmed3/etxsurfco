import { createFileRoute, Link } from "@tanstack/react-router";
import { BoatCard } from "@/components/boat-card";
import { PageHero } from "@/components/page-hero";
import { useCatalog } from "@/lib/use-catalog";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/favorites")({ component: Page });

function Page() {
  const ids = useAppStore((s) => s.favorites);
  const { boats } = useCatalog();
  const saved = boats.filter((b) => ids.includes(b.id));
  return (
    <>
      <PageHero
        kicker="Saved boats"
        title="Your shortlist"
        lede="Saved on this device. Add a second boat to compare specs side by side."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {saved.length === 0 ? (
          <div className="rounded-xl border border-line bg-cream p-10 text-center">
            <p className="text-muted">No saved boats yet.</p>
            <Link to="/inventory" className="mt-4 inline-flex text-teal font-medium">
              Browse inventory
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.map((b) => (
              <BoatCard key={b.id} boat={b} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
