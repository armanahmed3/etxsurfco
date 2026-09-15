import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Inbox, ShipWheel, Users } from "lucide-react";
import { deskStats } from "@/lib/desk";

export const Route = createFileRoute("/admin/")({ component: Page });

function Page() {
  const [stats, setStats] = useState({
    boats: 0,
    newLeads: 0,
    blogs: 0,
    staff: 0,
  });

  useEffect(() => {
    deskStats()
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    { to: "/admin/listings", label: "Listings", value: stats.boats, icon: ShipWheel },
    { to: "/admin/leads", label: "New leads", value: stats.newLeads, icon: Inbox },
    { to: "/admin/blogs", label: "Blog posts", value: stats.blogs, icon: FileText },
    { to: "/admin/staff", label: "Desk logins", value: stats.staff, icon: Users },
  ];

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-teal">Whitehouse desk</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">Good morning.</h1>
      <p className="mt-2 text-muted max-w-xl">
        Add and edit boats, read the forms people submitted, publish blogs, and
        grant staff a login.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-xl border border-line bg-cream p-5 hover:border-teal"
          >
            <c.icon className="size-5 text-teal" />
            <p className="mt-4 font-display text-3xl tabular-nums">{c.value}</p>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
