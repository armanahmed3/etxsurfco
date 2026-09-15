import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  FileText,
  Inbox,
  LayoutDashboard,
  Menu,
  ShipWheel,
  Users,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getDeskSession } from "@/lib/desk";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/listings", label: "Listings", icon: ShipWheel },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/staff", label: "Staff", icon: Users },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [desk, setDesk] = useState<"load" | "no" | "yes">("load");
  const [who, setWho] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setDesk("no");
      return;
    }
    let live = true;
    getDeskSession()
      .then((s) => {
        if (!live) return;
        setDesk(s ? "yes" : "no");
        setWho(s ? `${s.name} · ${s.role}` : "");
      })
      .catch(() => {
        if (live) setDesk("no");
      });
    return () => {
      live = false;
    };
  }, [user, isPending]);

  if (isPending || desk === "load") {
    return (
      <div className="min-h-dvh bg-navy grid place-items-center">
        <div className="h-10 w-40 rounded-md bg-navy-3 animate-pulse" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn to="/login" />;
  if (desk !== "yes") {
    return (
      <div className="min-h-dvh bg-navy text-cream grid place-items-center px-4">
        <div className="max-w-md text-center">
          <Logo />
          <h1 className="mt-6 font-display text-3xl">No desk access yet</h1>
          <p className="mt-3 text-foam">
            You are signed in as {user.primaryEmail ?? user.displayName}. Ask an
            owner to add this email under Staff and turn on desk login.
          </p>
          <div className="mt-6 flex justify-center">
            <UserButton />
          </div>
          <Link to="/" className="mt-6 inline-block text-sm text-teal">
            Back to the lot
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-paper text-ink flex">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-navy text-cream">
        <Link to="/admin" className="px-5 py-5 border-b border-line-dark">
          <Logo />
          <p className="mt-2 text-xs uppercase tracking-widest text-teal">
            Desk
          </p>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((l) => {
            const exact = "exact" in l && l.exact;
            const active = exact
              ? pathname === l.to
              : pathname === l.to || pathname.startsWith(`${l.to}/`);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "h-11 px-3 rounded-md text-sm flex items-center gap-2",
                  active ? "bg-teal text-cream" : "text-foam hover:bg-navy-3 hover:text-cream",
                )}
              >
                <l.icon className="size-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-line-dark text-xs text-foam">
          <p>{who}</p>
          <Link to="/" className="mt-2 inline-block text-teal">
            View public site
          </Link>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-line bg-cream flex items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            className="lg:hidden size-11 rounded-md hover:bg-paper-2 inline-flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <p className="font-display text-lg lg:hidden">Desk</p>
          <div className="ml-auto">
            <UserButton />
          </div>
        </header>
        {open ? (
          <div className="lg:hidden border-b border-line bg-navy text-cream p-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="h-11 px-3 rounded-md text-sm flex items-center gap-2 text-foam hover:text-cream"
              >
                <l.icon className="size-4" />
                {l.label}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
