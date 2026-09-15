import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GitCompareArrows, Heart, Phone } from "lucide-react";
import { BoatCard } from "@/components/boat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBoat } from "@/data/boats";
import { useCatalog } from "@/lib/use-catalog";
import { useAppStore } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/inventory/$slug")({
  component: BoatPage,
});

function BoatPage() {
  const { slug } = Route.useParams();
  const { boats, ready } = useCatalog();
  const boat = boats.find((b) => b.slug === slug) ?? getBoat(slug);
  if (!boat && !ready) {
    return <div className="min-h-80 bg-paper" />;
  }
  if (!boat) throw notFound();
  const [shot, setShot] = useState(0);
  const hydrated = useHydrated();
  const loved = useAppStore((s) => hydrated && s.favorites.includes(boat.id));
  const compared = useAppStore((s) => hydrated && s.compare.includes(boat.id));
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const related = boats
    .filter((b) => b.id !== boat.id && (b.make === boat.make || b.category === boat.category))
    .slice(0, 3);

  const specs: [string, string][] = [
    ["Condition", boat.condition],
    ["Stock", boat.stock],
    ["Year", String(boat.year)],
    ["Make", boat.make],
    ["Model", boat.model],
    ["Length", boat.lengthLabel],
    ["Category", boat.category],
  ];
  if (boat.color) specs.push(["Color", boat.color]);
  if (boat.engine) specs.push(["Engine", boat.engine]);
  if (boat.horsepower) specs.push(["Horsepower", `${boat.horsepower} HP`]);
  if (boat.hours != null) specs.push(["Hours", String(boat.hours)]);
  if (boat.propulsion) specs.push(["Propulsion", boat.propulsion]);
  if (boat.hull) specs.push(["Hull", boat.hull]);
  if (boat.beam) specs.push(["Beam", boat.beam]);
  if (boat.fuelType) specs.push(["Fuel", boat.fuelType]);
  if (boat.fuelCapacityGal) specs.push(["Fuel capacity", `${boat.fuelCapacityGal} gal`]);
  if (boat.dryWeightLbs) specs.push(["Dry weight", `${boat.dryWeightLbs.toLocaleString()} lbs`]);
  if (boat.hin) specs.push(["HIN", boat.hin]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <p className="text-sm text-muted mb-4">
        <Link to="/inventory" className="hover:text-teal">
          Inventory
        </Link>{" "}
        / {boat.title}
      </p>
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div>
          <div className="rounded-xl overflow-hidden bg-navy aspect-[4/3]">
            <img
              src={boat.gallery[shot] ?? boat.image}
              alt={boat.title}
              className="size-full object-cover"
            />
          </div>
          {boat.gallery.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {boat.gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setShot(i)}
                  className={cn(
                    "rounded-md overflow-hidden aspect-[4/3] border-2",
                    i === shot ? "border-teal" : "border-transparent",
                  )}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <div className="flex gap-2 mb-3">
            <Badge>{boat.condition}</Badge>
            <Badge tone="foam">{boat.category}</Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl">{boat.title}</h1>
          <p className="mt-3 font-display text-3xl text-teal tabular-nums">
            {formatPrice(boat.price)}
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">{boat.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {boat.highlights.map((h) => (
              <li
                key={h}
                className="h-8 px-3 rounded-full bg-paper-2 text-xs font-medium inline-flex items-center"
              >
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/quote"
              search={{ boat: boat.slug }}
              className="h-12 px-5 rounded-lg bg-teal text-cream font-medium inline-flex items-center"
            >
              Get a quote
            </Link>
            <Link
              to="/schedule"
              search={{ boat: boat.slug }}
              className="h-12 px-5 rounded-lg bg-navy text-cream font-medium inline-flex items-center"
            >
              Schedule viewing
            </Link>
            <a
              href="tel:9034713240"
              className="h-12 px-5 rounded-lg border border-line font-medium inline-flex items-center gap-2"
            >
              <Phone className="size-4" /> Call
            </a>
            <button
              type="button"
              onClick={() => toggleFavorite(boat.id)}
              className={cn(
                "size-12 rounded-lg border inline-flex items-center justify-center",
                loved ? "border-teal bg-foam text-teal" : "border-line",
              )}
              aria-label="Save"
            >
              <Heart className={cn("size-5", loved && "fill-current")} />
            </button>
            <button
              type="button"
              onClick={() => toggleCompare(boat.id)}
              className={cn(
                "size-12 rounded-lg border inline-flex items-center justify-center",
                compared ? "border-teal bg-foam text-teal" : "border-line",
              )}
              aria-label="Compare"
            >
              <GitCompareArrows className="size-5" />
            </button>
          </div>
          <p className="mt-4 text-xs text-muted">
            Price and availability subject to change. Located in Whitehouse, TX.
          </p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl">Specifications</h2>
      <dl className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 border border-line rounded-xl overflow-hidden">
        {specs.map(([k, v]) => (
          <div key={k} className="px-4 py-3 border-b sm:border-r border-line bg-cream">
            <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
            <dd className="mt-0.5 font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 rounded-xl bg-navy text-cream p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-display text-2xl">Ready to take a test ride?</p>
          <p className="text-foam mt-1">Trade-ins welcome. Financing on site.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="primary">
            <Link to="/trade-in">Value your trade</Link>
          </Button>
          <Button asChild variant="invert">
            <Link to="/financing">Get financing</Link>
          </Button>
        </div>
      </div>

      {related.length ? (
        <div className="mt-14">
          <h2 className="font-display text-2xl mb-5">You might also like</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((b) => (
              <BoatCard key={b.id} boat={b} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
