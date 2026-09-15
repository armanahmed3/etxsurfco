import { Link } from "@tanstack/react-router";
import { GitCompareArrows, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Boat } from "@/data/boats";
import { useAppStore } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

export function BoatCard({ boat }: { boat: Boat }) {
  const hydrated = useHydrated();
  const favorites = useAppStore((s) => s.favorites);
  const compare = useAppStore((s) => s.compare);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const loved = hydrated && favorites.includes(boat.id);
  const compared = hydrated && compare.includes(boat.id);

  return (
    <article className="group flex flex-col rounded-xl bg-cream border border-line overflow-hidden">
      <Link
        to="/inventory/$slug"
        params={{ slug: boat.slug }}
        className="relative aspect-[4/3] overflow-hidden bg-navy-2"
      >
        <img
          src={boat.image}
          alt={boat.title}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge tone={boat.condition === "New" ? "teal" : "navy"}>
            {boat.condition}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-display text-cream text-xl leading-tight drop-shadow">
            {formatPrice(boat.price)}
          </p>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-widest text-muted">
          {boat.year} · {boat.make}
        </p>
        <Link
          to="/inventory/$slug"
          params={{ slug: boat.slug }}
          className="mt-1 font-display text-lg leading-snug text-ink hover:text-teal"
        >
          {boat.model}
        </Link>
        <p className="mt-2 text-sm text-muted">
          {boat.lengthLabel}
          {boat.hours != null ? ` · ${boat.hours} hrs` : ""}
          {boat.horsepower ? ` · ${boat.horsepower} HP` : ""}
        </p>
        <p className="mt-1 text-xs text-muted">Stock {boat.stock}</p>
        <div className="mt-4 pt-3 border-t border-line flex items-center gap-2">
          <Link
            to="/inventory/$slug"
            params={{ slug: boat.slug }}
            className="flex-1 h-10 rounded-md bg-navy text-cream text-sm font-medium inline-flex items-center justify-center hover:bg-navy-2"
          >
            View details
          </Link>
          <button
            type="button"
            aria-label={loved ? "Remove from saved" : "Save boat"}
            onClick={() => toggleFavorite(boat.id)}
            className={cn(
              "size-10 rounded-md border inline-flex items-center justify-center",
              loved
                ? "border-teal bg-foam text-teal"
                : "border-line text-muted hover:text-ink",
            )}
          >
            <Heart className={cn("size-4", loved && "fill-current")} />
          </button>
          <button
            type="button"
            aria-label={compared ? "Remove from compare" : "Compare"}
            onClick={() => toggleCompare(boat.id)}
            className={cn(
              "size-10 rounded-md border inline-flex items-center justify-center",
              compared
                ? "border-teal bg-foam text-teal"
                : "border-line text-muted hover:text-ink",
            )}
          >
            <GitCompareArrows className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
