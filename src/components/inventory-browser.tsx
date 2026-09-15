import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { BoatCard } from "@/components/boat-card";
import { Input, Select } from "@/components/ui/input";
import { type Boat, type Condition } from "@/data/boats";
import { useCatalog } from "@/lib/use-catalog";

export function InventoryBrowser({
  preset,
}: {
  preset?: Condition;
}) {
  const [q, setQ] = useState("");
  const [make, setMake] = useState("all");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState<string>(preset ?? "all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [open, setOpen] = useState(false);
  const { boats } = useCatalog();
  const makes = [...new Set(boats.map((b) => b.make))].sort();
  const categories = [...new Set(boats.map((b) => b.category))];

  const list = useMemo(() => {
    let rows: Boat[] = boats.filter((b) => {
      if (preset && b.condition !== preset) return false;
      if (condition !== "all" && b.condition !== condition) return false;
      if (make !== "all" && b.make !== make) return false;
      if (category !== "all" && b.category !== category) return false;
      if (price === "under50" && (b.price == null || b.price >= 50000)) return false;
      if (price === "50to100" && (b.price == null || b.price < 50000 || b.price >= 100000))
        return false;
      if (price === "100plus" && (b.price == null || b.price < 100000)) return false;
      if (price === "call" && b.price != null) return false;
      if (q.trim()) {
        const hay = `${b.title} ${b.make} ${b.model} ${b.stock} ${b.category}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
    rows = [...rows].sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? 9e9) - (b.price ?? 9e9);
      if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      if (sort === "year") return b.year - a.year;
      if (sort === "length") return b.lengthFt - a.lengthFt;
      return Number(b.featured) - Number(a.featured);
    });
    return rows;
  }, [q, make, category, condition, price, sort, preset, boats]);

  const filters = (
    <div className="space-y-3">
      <Select value={make} onChange={(e) => setMake(e.target.value)}>
        <option value="all">All makes</option>
        {makes.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </Select>
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </Select>
      {!preset ? (
        <Select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="all">New & pre-owned</option>
          <option value="New">New</option>
          <option value="Pre-Owned">Pre-owned</option>
        </Select>
      ) : null}
      <Select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value="all">Any price</option>
        <option value="under50">Under $50k</option>
        <option value="50to100">$50k – $100k</option>
        <option value="100plus">$100k+</option>
        <option value="call">Call for price</option>
      </Select>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <p className="text-sm text-muted tabular-nums">
          {list.length} boat{list.length === 1 ? "" : "s"} in Whitehouse
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="size-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search make, model, stock…"
              className="pl-9"
            />
          </div>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="w-40">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low</option>
            <option value="price-desc">Price: high</option>
            <option value="year">Newest year</option>
            <option value="length">Length</option>
          </Select>
          <button
            type="button"
            className="md:hidden size-11 rounded-md border border-line inline-flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Filters"
          >
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden md:block sticky top-28 self-start">{filters}</aside>
        {open ? <div className="md:hidden">{filters}</div> : null}
        <div>
          {list.length === 0 ? (
            <p className="rounded-xl border border-line bg-cream p-10 text-center text-muted">
              No boats match those filters. Try widening the search.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {list.map((b) => (
                <BoatCard key={b.id} boat={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
