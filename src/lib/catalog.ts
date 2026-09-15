import { type Boat } from "@/data/boats";

export type { Boat };

export type BoatRow = {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  title: string;
  condition: string;
  category: string;
  price: number | null;
  stock: string;
  length_ft: number;
  length_label: string;
  color: string | null;
  fuel_type: string | null;
  fuel_capacity_gal: number | null;
  engine: string | null;
  hours: number | null;
  propulsion: string | null;
  hull: string | null;
  horsepower: number | null;
  beam: string | null;
  hin: string | null;
  dry_weight_lbs: number | null;
  image: string;
  gallery: string;
  featured: boolean | number;
  description: string;
  highlights: string;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function num(v: unknown): number | null {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function rowToBoat(row: BoatRow): Boat {
  let gallery: string[] = [];
  let highlights: string[] = [];
  try {
    gallery = JSON.parse(row.gallery || "[]");
  } catch {
    gallery = row.image ? [row.image] : [];
  }
  try {
    highlights = JSON.parse(row.highlights || "[]");
  } catch {
    highlights = [];
  }
  return {
    id: row.id,
    slug: row.slug,
    year: Number(row.year),
    make: row.make,
    model: row.model,
    title: row.title,
    condition: row.condition === "Pre-Owned" ? "Pre-Owned" : "New",
    category: row.category as Boat["category"],
    price: num(row.price),
    stock: row.stock,
    lengthFt: Number(row.length_ft) || 0,
    lengthLabel: row.length_label,
    color: row.color ?? undefined,
    fuelType: row.fuel_type ?? undefined,
    fuelCapacityGal: num(row.fuel_capacity_gal) ?? undefined,
    engine: row.engine ?? undefined,
    hours: num(row.hours) ?? undefined,
    propulsion: row.propulsion ?? undefined,
    hull: row.hull ?? undefined,
    horsepower: num(row.horsepower) ?? undefined,
    beam: row.beam ?? undefined,
    hin: row.hin ?? undefined,
    dryWeightLbs: num(row.dry_weight_lbs) ?? undefined,
    image: row.image,
    gallery: gallery.length ? gallery : [row.image],
    featured: Boolean(row.featured),
    description: row.description,
    highlights,
  };
}

export async function readImageFile(file: File): Promise<string> {
  if (file.size > 1_800_000) {
    throw new Error("Keep photos under 1.8 MB.");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
