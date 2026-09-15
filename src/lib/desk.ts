import { createServerFn } from "@tanstack/react-start";
import { boats as seedBoats, type Boat } from "@/data/boats";
import { staff as seedStaff } from "@/data/content";
import { authMiddleware } from "@/lib/auth/middleware";
import { rowToBoat, slugify, type BoatRow } from "@/lib/catalog";
import { getSql, type Sql } from "@/lib/db";

export type DeskStaff = {
  id: string;
  user_id: string | null;
  email: string;
  name: string;
  title: string;
  phone: string | null;
  photo: string | null;
  bio: string | null;
  role: string;
  can_access: boolean | number;
};

export type DeskLead = {
  id: string;
  kind: string;
  name: string;
  email: string;
  phone: string;
  fields: string;
  status: string;
  created_at: string;
};

export type DeskBlog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  published: boolean | number;
  author_name: string;
  created_at: string;
  updated_at: string;
};

export type BoatDraft = {
  id?: string;
  slug?: string;
  year: number;
  make: string;
  model: string;
  title: string;
  condition: "New" | "Pre-Owned";
  category: string;
  price: number | null;
  stock: string;
  lengthFt: number;
  lengthLabel: string;
  color?: string;
  fuelType?: string;
  fuelCapacityGal?: number | null;
  engine?: string;
  hours?: number | null;
  propulsion?: string;
  hull?: string;
  horsepower?: number | null;
  beam?: string;
  hin?: string;
  dryWeightLbs?: number | null;
  image: string;
  gallery: string[];
  featured?: boolean;
  description: string;
  highlights: string[];
};

export type StaffDraft = {
  id?: string;
  email: string;
  name: string;
  title: string;
  phone?: string;
  photo?: string;
  bio?: string;
  role: "owner" | "admin" | "staff";
  can_access: boolean;
};

export type BlogDraft = {
  id?: string;
  slug?: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image?: string;
  published: boolean;
  author_name?: string;
};

class DeskForbiddenError extends Error {
  readonly status = 403;
  constructor(message = "Desk access required") {
    super(message);
    this.name = "DeskForbiddenError";
  }
}

let seeded = false;

async function ensureSeeded(sql: Sql) {
  if (seeded) return;
  const existing = await sql<{ n: number }>`select count(*)::int as n from boats`;
  if ((existing[0]?.n ?? 0) === 0) {
    for (const b of seedBoats) {
      await insertBoatRow(sql, {
        ...b,
        gallery: b.gallery,
        highlights: b.highlights,
      });
    }
  }
  const staffCount = await sql<{ n: number }>`select count(*)::int as n from staff`;
  if ((staffCount[0]?.n ?? 0) === 0) {
    for (const s of seedStaff) {
      const id = crypto.randomUUID();
      const email = (s.email ?? `${slugify(s.name)}@etxsurfco.com`).toLowerCase();
      await sql`
        insert into staff (id, email, name, title, phone, bio, role, can_access)
        values (
          ${id},
          ${email},
          ${s.name},
          ${s.role},
          ${"phone" in s ? (s.phone ?? null) : null},
          ${s.blurb},
          ${"staff"},
          ${false}
        )
      `;
    }
  }
  const blogCount = await sql<{ n: number }>`select count(*)::int as n from blogs`;
  if ((blogCount[0]?.n ?? 0) === 0) {
    const posts = [
      {
        title: "How to pick a wakesurf boat for East Texas lakes",
        excerpt:
          "Lake Palestine and Jacksonville water reward a hull that makes a clean, long wave — not the biggest showroom tower.",
        body: `East Texas lakes are not the ocean. The right surf boat here is the one that builds a wave at a comfortable cruise, seats the family, and still trailers behind a truck you already own.

Start with how you actually ride. If the crew is mostly first-wave surfers, a 21–23 foot Malibu or Axis with a factory ballast system will feel more usable than a 25-foot tournament hull. If you hunt timber in the morning and surf in the afternoon, talk to the desk about Thor and a second trailer.

Come sit in the boats on the Whitehouse lot. The right fit is the one you do not want to get out of.`,
      },
      {
        title: "Winterization, storage, and why Brenda's list matters",
        excerpt:
          "A $125 honest repair beats a $2,500 surprise. Same goes for putting the boat away before the first freeze.",
        body: `We winterize in Whitehouse so East Texas cold snaps never touch your engine, raw-water circuit, or ballast bags.

Bring the boat in before the first hard freeze. We fog the engine, treat the fuel, drain the systems, and cover the hull. If you want it stored, say so when you book — covered indoor space goes first.

Parts that are not on the shelf get ordered the same day. That is why customers ask for Brenda by name.`,
      },
    ];
    for (const p of posts) {
      const id = crypto.randomUUID();
      const slug = slugify(p.title);
      await sql`
        insert into blogs (id, slug, title, excerpt, body, cover_image, published, author_name)
        values (
          ${id},
          ${slug},
          ${p.title},
          ${p.excerpt},
          ${p.body},
          ${"/images/site/hero-wake.jpg"},
          ${true},
          ${"ETX Surf Co"}
        )
      `;
    }
  }
  seeded = true;
}

async function insertBoatRow(sql: Sql, b: Boat) {
  await sql`
    insert into boats (
      id, slug, year, make, model, title, condition, category, price, stock,
      length_ft, length_label, color, fuel_type, fuel_capacity_gal, engine, hours,
      propulsion, hull, horsepower, beam, hin, dry_weight_lbs, image, gallery,
      featured, description, highlights
    ) values (
      ${b.id},
      ${b.slug},
      ${b.year},
      ${b.make},
      ${b.model},
      ${b.title},
      ${b.condition},
      ${b.category},
      ${b.price},
      ${b.stock},
      ${b.lengthFt},
      ${b.lengthLabel},
      ${b.color ?? null},
      ${b.fuelType ?? null},
      ${b.fuelCapacityGal ?? null},
      ${b.engine ?? null},
      ${b.hours ?? null},
      ${b.propulsion ?? null},
      ${b.hull ?? null},
      ${b.horsepower ?? null},
      ${b.beam ?? null},
      ${b.hin ?? null},
      ${b.dryWeightLbs ?? null},
      ${b.image},
      ${JSON.stringify(b.gallery)},
      ${Boolean(b.featured)},
      ${b.description},
      ${JSON.stringify(b.highlights)}
    )
  `;
}

async function requireDesk(userId: string): Promise<DeskStaff> {
  const sql = await getSql();
  await ensureSeeded(sql);

  const users = await sql<{ email: string; name: string }>`
    select email, name from "user" where id = ${userId}
  `;
  const email = (users[0]?.email ?? "").toLowerCase();
  const name = users[0]?.name || "Desk";

  if (email) {
    await sql`
      update staff
      set user_id = ${userId}
      where lower(email) = ${email}
        and (user_id is null or user_id = ${userId})
    `;
  }

  const linked = await sql<DeskStaff>`
    select * from staff
    where user_id = ${userId} and can_access = true
    limit 1
  `;
  if (linked[0]) return linked[0];

  const open = await sql<{ n: number }>`
    select count(*)::int as n from staff where can_access = true
  `;
  if ((open[0]?.n ?? 0) === 0) {
    const id = crypto.randomUUID();
    const deskEmail = email || `owner-${userId.slice(0, 8)}@etxsurfco.com`;
    await sql`
      insert into staff (id, user_id, email, name, title, role, can_access, bio)
      values (
        ${id},
        ${userId},
        ${deskEmail},
        ${name},
        ${"Owner"},
        ${"owner"},
        ${true},
        ${null}
      )
      on conflict (email) do update
        set user_id = ${userId}, can_access = true, role = 'owner'
    `;
    const row = await sql<DeskStaff>`
      select * from staff where user_id = ${userId} and can_access = true limit 1
    `;
    if (row[0]) return row[0];
  }

  throw new DeskForbiddenError();
}

export const listPublicBoats = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<BoatRow>`select * from boats order by featured desc, year desc, title`;
    return rows.map(rowToBoat);
  },
);

export const getPublicBoat = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<BoatRow>`select * from boats where slug = ${slug} limit 1`;
    return rows[0] ? rowToBoat(rows[0]) : null;
  });

export const listPublicBlogs = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    return sql<DeskBlog>`
      select * from blogs where published = true order by created_at desc
    `;
  },
);

export const getPublicBlog = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<DeskBlog>`
      select * from blogs where slug = ${slug} and published = true limit 1
    `;
    return rows[0] ?? null;
  });

export const listPublicStaff = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    return sql<DeskStaff>`
      select * from staff
      where coalesce(bio, '') <> ''
      order by name
    `;
  },
);

export const submitLead = createServerFn({ method: "POST" })
  .validator((d: { kind: string; fields: Record<string, string> }) => {
    if (!d?.kind || typeof d.kind !== "string") throw new Error("Invalid request");
    return { kind: d.kind.slice(0, 80), fields: d.fields ?? {} };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const fields = data.fields;
    const id = crypto.randomUUID();
    const name =
      [fields.firstName, fields.lastName].filter(Boolean).join(" ").trim() ||
      fields.name ||
      "";
    const email = String(fields.email ?? "").slice(0, 200);
    const phone = String(fields.phone ?? "").slice(0, 40);
    await sql`
      insert into leads (id, kind, name, email, phone, fields, status)
      values (
        ${id},
        ${data.kind},
        ${name},
        ${email},
        ${phone},
        ${JSON.stringify(fields)},
        ${"new"}
      )
    `;
    return { id };
  });

export const getDeskSession = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    try {
      const staff = await requireDesk(context.userId);
      return {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        title: staff.title,
        role: staff.role,
        can_access: true,
      };
    } catch (err) {
      if (err instanceof DeskForbiddenError) return null;
      throw err;
    }
  });

export const deskStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    const boatsN = await sql<{ n: number }>`select count(*)::int as n from boats`;
    const leadsN = await sql<{ n: number }>`select count(*)::int as n from leads where status = 'new'`;
    const blogsN = await sql<{ n: number }>`select count(*)::int as n from blogs`;
    const staffN = await sql<{ n: number }>`select count(*)::int as n from staff where can_access = true`;
    return {
      boats: boatsN[0]?.n ?? 0,
      newLeads: leadsN[0]?.n ?? 0,
      blogs: blogsN[0]?.n ?? 0,
      staff: staffN[0]?.n ?? 0,
    };
  });

export const listDeskBoats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    const rows = await sql<BoatRow>`select * from boats order by year desc, title`;
    return rows.map(rowToBoat);
  });

export const saveBoat = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: BoatDraft) => d)
  .handler(async ({ context, data }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    const id = data.id?.trim() || data.stock?.trim() || crypto.randomUUID();
    const slug =
      data.slug?.trim() ||
      slugify(`${data.year} ${data.make} ${data.model}`) ||
      id.toLowerCase();
    const gallery = data.gallery?.length ? data.gallery : data.image ? [data.image] : [];
    const exists = await sql<{ id: string }>`select id from boats where id = ${id} limit 1`;
    if (exists[0]) {
      await sql`
        update boats set
          slug = ${slug},
          year = ${data.year},
          make = ${data.make},
          model = ${data.model},
          title = ${data.title},
          condition = ${data.condition},
          category = ${data.category},
          price = ${data.price},
          stock = ${data.stock},
          length_ft = ${data.lengthFt},
          length_label = ${data.lengthLabel},
          color = ${data.color || null},
          fuel_type = ${data.fuelType || null},
          fuel_capacity_gal = ${data.fuelCapacityGal ?? null},
          engine = ${data.engine || null},
          hours = ${data.hours ?? null},
          propulsion = ${data.propulsion || null},
          hull = ${data.hull || null},
          horsepower = ${data.horsepower ?? null},
          beam = ${data.beam || null},
          hin = ${data.hin || null},
          dry_weight_lbs = ${data.dryWeightLbs ?? null},
          image = ${data.image},
          gallery = ${JSON.stringify(gallery)},
          featured = ${Boolean(data.featured)},
          description = ${data.description},
          highlights = ${JSON.stringify(data.highlights ?? [])},
          updated_at = now()
        where id = ${id}
      `;
    } else {
      await insertBoatRow(sql, {
        id,
        slug,
        year: data.year,
        make: data.make,
        model: data.model,
        title: data.title,
        condition: data.condition,
        category: data.category as Boat["category"],
        price: data.price,
        stock: data.stock,
        lengthFt: data.lengthFt,
        lengthLabel: data.lengthLabel,
        color: data.color,
        fuelType: data.fuelType,
        fuelCapacityGal: data.fuelCapacityGal ?? undefined,
        engine: data.engine,
        hours: data.hours ?? undefined,
        propulsion: data.propulsion,
        hull: data.hull,
        horsepower: data.horsepower ?? undefined,
        beam: data.beam,
        hin: data.hin,
        dryWeightLbs: data.dryWeightLbs ?? undefined,
        image: data.image,
        gallery,
        featured: data.featured,
        description: data.description,
        highlights: data.highlights ?? [],
      });
    }
    return { id, slug };
  });

export const deleteBoat = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    await sql`delete from boats where id = ${id}`;
    return { ok: true };
  });

export const listDeskLeads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    return sql<DeskLead>`select * from leads order by created_at desc`;
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id: string; status: string }) => d)
  .handler(async ({ context, data }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    await sql`update leads set status = ${data.status} where id = ${data.id}`;
    return { ok: true };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    await sql`delete from leads where id = ${id}`;
    return { ok: true };
  });

export const listDeskBlogs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    return sql<DeskBlog>`select * from blogs order by created_at desc`;
  });

export const saveBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: BlogDraft) => d)
  .handler(async ({ context, data }) => {
    const me = await requireDesk(context.userId);
    const sql = await getSql();
    const id = data.id?.trim() || crypto.randomUUID();
    const slug = data.slug?.trim() || slugify(data.title) || id.slice(0, 8);
    const exists = await sql<{ id: string }>`select id from blogs where id = ${id} limit 1`;
    if (exists[0]) {
      await sql`
        update blogs set
          slug = ${slug},
          title = ${data.title},
          excerpt = ${data.excerpt},
          body = ${data.body},
          cover_image = ${data.cover_image || null},
          published = ${Boolean(data.published)},
          author_name = ${data.author_name || me.name},
          updated_at = now()
        where id = ${id}
      `;
    } else {
      await sql`
        insert into blogs (id, slug, title, excerpt, body, cover_image, published, author_name)
        values (
          ${id},
          ${slug},
          ${data.title},
          ${data.excerpt},
          ${data.body},
          ${data.cover_image || null},
          ${Boolean(data.published)},
          ${data.author_name || me.name}
        )
      `;
    }
    return { id, slug };
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    await sql`delete from blogs where id = ${id}`;
    return { ok: true };
  });

export const listDeskStaff = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    return sql<DeskStaff>`select * from staff order by name`;
  });

export const saveStaff = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: StaffDraft) => d)
  .handler(async ({ context, data }) => {
    await requireDesk(context.userId);
    const sql = await getSql();
    const id = data.id?.trim() || crypto.randomUUID();
    const email = data.email.trim().toLowerCase();
    const exists = await sql<{ id: string }>`select id from staff where id = ${id} limit 1`;
    if (exists[0]) {
      await sql`
        update staff set
          email = ${email},
          name = ${data.name},
          title = ${data.title},
          phone = ${data.phone || null},
          photo = ${data.photo || null},
          bio = ${data.bio || null},
          role = ${data.role},
          can_access = ${Boolean(data.can_access)}
        where id = ${id}
      `;
    } else {
      await sql`
        insert into staff (id, email, name, title, phone, photo, bio, role, can_access)
        values (
          ${id},
          ${email},
          ${data.name},
          ${data.title},
          ${data.phone || null},
          ${data.photo || null},
          ${data.bio || null},
          ${data.role},
          ${Boolean(data.can_access)}
        )
      `;
    }
    return { id };
  });

export const deleteStaff = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const me = await requireDesk(context.userId);
    const sql = await getSql();
    if (me.id === id) throw new Error("You cannot remove your own desk login.");
    const owners = await sql<{ n: number }>`
      select count(*)::int as n from staff where role = 'owner' and can_access = true and id <> ${id}
    `;
    const target = await sql<{ role: string }>`select role from staff where id = ${id}`;
    if (target[0]?.role === "owner" && (owners[0]?.n ?? 0) === 0) {
      throw new Error("Keep at least one owner on the desk.");
    }
    await sql`delete from staff where id = ${id}`;
    return { ok: true };
  });
