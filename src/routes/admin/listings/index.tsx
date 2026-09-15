import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Boat } from "@/data/boats";
import { deleteBoat, listDeskBoats } from "@/lib/desk";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/admin/listings/")({ component: Page });

function Page() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [q, setQ] = useState("");

  function load() {
    listDeskBoats()
      .then(setBoats)
      .catch(() => setBoats([]));
  }

  useEffect(() => {
    load();
  }, []);

  const rows = boats.filter((b) => {
    if (!q.trim()) return true;
    const hay = `${b.title} ${b.stock} ${b.make}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-teal">Inventory</p>
          <h1 className="mt-2 font-display text-3xl">Listings</h1>
        </div>
        <Button asChild>
          <Link to="/admin/listings/$id" params={{ id: "new" }}>
            <Plus className="size-4" />
            Add boat
          </Link>
        </Button>
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search title, stock, make"
        className="mt-6 w-full max-w-md h-11 rounded-md border border-line bg-cream px-3.5 text-sm"
      />
      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-cream">
        <table className="w-full text-sm">
          <thead className="text-left text-muted border-b border-line">
            <tr>
              <th className="px-4 py-3 font-medium">Boat</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Condition</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <Link
                    to="/admin/listings/$id"
                    params={{ id: b.id }}
                    className="font-medium hover:text-teal"
                  >
                    {b.title}
                  </Link>
                </td>
                <td className="px-4 py-3 tabular-nums text-muted">{b.stock}</td>
                <td className="px-4 py-3">{b.condition}</td>
                <td className="px-4 py-3 tabular-nums">{formatPrice(b.price)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="size-10 inline-flex items-center justify-center rounded-md hover:bg-paper-2 text-danger"
                    aria-label={`Remove ${b.title}`}
                    onClick={async () => {
                      if (!confirm(`Remove ${b.title} from the lot?`)) return;
                      await deleteBoat({ data: b.id });
                      load();
                    }}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="p-8 text-center text-muted">No listings match.</p>
        ) : null}
      </div>
    </div>
  );
}
