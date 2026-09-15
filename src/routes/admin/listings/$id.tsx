import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { categories, type Boat } from "@/data/boats";
import { readImageFile } from "@/lib/catalog";
import { listDeskBoats, saveBoat, type BoatDraft } from "@/lib/desk";

export const Route = createFileRoute("/admin/listings/$id")({ component: Page });

const empty: BoatDraft = {
  year: new Date().getFullYear(),
  make: "",
  model: "",
  title: "",
  condition: "New",
  category: "Wake / Surf / Ski",
  price: null,
  stock: "",
  lengthFt: 21,
  lengthLabel: "21'",
  image: "/images/site/lot.jpg",
  gallery: [],
  description: "",
  highlights: [],
  featured: false,
};

function fromBoat(b: Boat): BoatDraft {
  return {
    id: b.id,
    slug: b.slug,
    year: b.year,
    make: b.make,
    model: b.model,
    title: b.title,
    condition: b.condition,
    category: b.category,
    price: b.price,
    stock: b.stock,
    lengthFt: b.lengthFt,
    lengthLabel: b.lengthLabel,
    color: b.color,
    fuelType: b.fuelType,
    fuelCapacityGal: b.fuelCapacityGal,
    engine: b.engine,
    hours: b.hours,
    propulsion: b.propulsion,
    hull: b.hull,
    horsepower: b.horsepower,
    beam: b.beam,
    hin: b.hin,
    dryWeightLbs: b.dryWeightLbs,
    image: b.image,
    gallery: b.gallery,
    featured: b.featured,
    description: b.description,
    highlights: b.highlights,
  };
}

function Page() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<BoatDraft>(empty);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    listDeskBoats().then((rows) => {
      const found = rows.find((b) => b.id === id);
      if (found) setForm(fromBoat(found));
    });
  }, [id, isNew]);

  function set<K extends keyof BoatDraft>(key: K, value: BoatDraft[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    try {
      const url = await readImageFile(file);
      setForm((f) => ({
        ...f,
        image: url,
        gallery: f.gallery.includes(url) ? f.gallery : [url, ...f.gallery],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read photo.");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const title =
        form.title.trim() || `${form.year} ${form.make} ${form.model}`.trim();
      await saveBoat({
        data: {
          ...form,
          id: isNew ? undefined : id,
          title,
          highlights: form.highlights.filter(Boolean),
          gallery: form.gallery.length ? form.gallery : [form.image],
        },
      });
      await nav({ to: "/admin/listings" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.22em] text-teal">Listing</p>
      <h1 className="mt-2 font-display text-3xl">
        {isNew ? "Add a boat" : form.title || "Edit boat"}
      </h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Year" required>
            <Input
              type="number"
              value={form.year}
              onChange={(e) => set("year", Number(e.target.value))}
              required
            />
          </Field>
          <Field label="Stock #" required>
            <Input
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              required
            />
          </Field>
          <Field label="Make" required>
            <Input value={form.make} onChange={(e) => set("make", e.target.value)} required />
          </Field>
          <Field label="Model" required>
            <Input value={form.model} onChange={(e) => set("model", e.target.value)} required />
          </Field>
          <Field label="Title" className="sm:col-span-2">
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Leave blank to use year + make + model"
            />
          </Field>
          <Field label="Condition" required>
            <Select
              value={form.condition}
              onChange={(e) => set("condition", e.target.value as BoatDraft["condition"])}
            >
              <option>New</option>
              <option>Pre-Owned</option>
            </Select>
          </Field>
          <Field label="Category" required>
            <Select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Price (USD)">
            <Input
              type="number"
              value={form.price ?? ""}
              onChange={(e) =>
                set("price", e.target.value === "" ? null : Number(e.target.value))
              }
              placeholder="Blank = call for price"
            />
          </Field>
          <Field label="Length (ft)" required>
            <Input
              type="number"
              step="0.1"
              value={form.lengthFt}
              onChange={(e) => {
                const n = Number(e.target.value);
                set("lengthFt", n);
                set("lengthLabel", `${n}'`);
              }}
            />
          </Field>
          <Field label="Color">
            <Input value={form.color ?? ""} onChange={(e) => set("color", e.target.value)} />
          </Field>
          <Field label="Engine">
            <Input value={form.engine ?? ""} onChange={(e) => set("engine", e.target.value)} />
          </Field>
          <Field label="Horsepower">
            <Input
              type="number"
              value={form.horsepower ?? ""}
              onChange={(e) =>
                set("horsepower", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </Field>
          <Field label="Hours">
            <Input
              type="number"
              value={form.hours ?? ""}
              onChange={(e) =>
                set("hours", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </Field>
          <Field label="Propulsion">
            <Input
              value={form.propulsion ?? ""}
              onChange={(e) => set("propulsion", e.target.value)}
            />
          </Field>
          <Field label="Hull">
            <Input value={form.hull ?? ""} onChange={(e) => set("hull", e.target.value)} />
          </Field>
          <Field label="Photo URL" className="sm:col-span-2">
            <Input value={form.image} onChange={(e) => set("image", e.target.value)} />
          </Field>
          <Field label="Upload photo" className="sm:col-span-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => void onPhoto(e.target.files?.[0])}
            />
          </Field>
        </div>
        {form.image ? (
          <img
            src={form.image}
            alt=""
            className="h-40 w-full object-cover rounded-lg border border-line"
          />
        ) : null}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={Boolean(form.featured)}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Featured on the homepage
        </label>
        <Field label="Description" required>
          <Textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
          />
        </Field>
        <Field label="Highlights (one per line)">
          <Textarea
            value={form.highlights.join("\n")}
            onChange={(e) =>
              set(
                "highlights",
                e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
              )
            }
          />
        </Field>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save listing"}
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/listings">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
