import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { type Boat } from "@/data/boats";
import { useCatalog } from "@/lib/use-catalog";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/compare")({ component: Page });

function Page() {
  const ids = useAppStore((s) => s.compare);
  const clear = useAppStore((s) => s.clearCompare);
  const { boats } = useCatalog();
  const rows = boats.filter((b) => ids.includes(b.id));
  const keys = [
    ["Price", (b: Boat) => formatPrice(b.price)],
    ["Condition", (b: Boat) => b.condition],
    ["Year", (b: Boat) => String(b.year)],
    ["Length", (b: Boat) => b.lengthLabel],
    ["Engine", (b: Boat) => b.engine ?? "—"],
    ["HP", (b: Boat) => (b.horsepower ? String(b.horsepower) : "—")],
    ["Hours", (b: Boat) => (b.hours != null ? String(b.hours) : "—")],
    ["Propulsion", (b: Boat) => b.propulsion ?? "—"],
    ["Stock", (b: Boat) => b.stock],
  ] as const;

  return (
    <>
      <PageHero kicker="Compare" title="Up to three hulls, side by side" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {rows.length < 2 ? (
          <p className="text-muted">
            Save at least two boats with the compare icon.{" "}
            <Link to="/inventory" className="text-teal">
              Inventory
            </Link>
          </p>
        ) : (
          <>
            <button type="button" onClick={clear} className="mb-4 text-sm text-teal">
              Clear compare
            </button>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="min-w-full text-sm">
                <thead className="bg-cream">
                  <tr>
                    <th className="p-3 text-left text-muted font-medium">Spec</th>
                    {rows.map((b) => (
                      <th key={b.id} className="p-3 text-left">
                        <Link
                          to="/inventory/$slug"
                          params={{ slug: b.slug }}
                          className="font-display text-base hover:text-teal"
                        >
                          {b.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keys.map(([label, fn]) => (
                    <tr key={label} className="border-t border-line">
                      <td className="p-3 text-muted">{label}</td>
                      {rows.map((b) => (
                        <td key={b.id} className="p-3 font-medium">
                          {fn(b)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
