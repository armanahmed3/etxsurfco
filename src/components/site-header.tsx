import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Clock, Heart, MapPin, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { isOpenNow, site } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const nav = [
  {
    label: "Inventory",
    href: "/inventory",
    items: [
      { label: "All inventory", href: "/inventory" },
      { label: "New boats", href: "/inventory/new" },
      { label: "Pre-owned", href: "/inventory/used" },
      { label: "Get a quote", href: "/quote" },
      { label: "Value your trade", href: "/trade-in" },
      { label: "Warranty", href: "/warranty" },
      { label: "Schedule a viewing", href: "/schedule" },
      { label: "Manufacturer promotions", href: "/promotions" },
    ],
  },
  {
    label: "Service",
    href: "/service",
    items: [
      { label: "Service department", href: "/service" },
      { label: "Book an appointment", href: "/service/appointments" },
      { label: "Boat detailing", href: "/service/detailing" },
      { label: "Ceramic coating", href: "/service/ceramic" },
      { label: "Storage & winterization", href: "/service/storage" },
    ],
  },
  {
    label: "Parts",
    href: "/parts",
    items: [
      { label: "Parts department", href: "/parts" },
      { label: "Parts request", href: "/parts/request" },
    ],
  },
  {
    label: "Financing",
    href: "/financing",
    items: [
      { label: "Finance department", href: "/financing" },
      { label: "Get prequalified", href: "/financing/prequalify" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Map & hours", href: "/hours" },
      { label: "Reviews", href: "/reviews" },
      { label: "Events", href: "/events" },
      { label: "Careers", href: "/careers" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ open: false, label: "Hours" });
  const hydrated = useHydrated();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const favCountRaw = useAppStore((s) => s.favorites.length);
  const compareCountRaw = useAppStore((s) => s.compare.length);
  const favCount = hydrated ? favCountRaw : 0;
  const compareCount = hydrated ? compareCountRaw : 0;

  useEffect(() => {
    setStatus(isOpenNow());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-navy text-cream">
      <div className="border-b border-line-dark hidden md:block">
        <div className="mx-auto max-w-6xl px-6 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5 text-foam">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {site.fullAddress}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  status.open ? "bg-teal" : "bg-muted",
                )}
              />
              {status.label}
            </span>
          </div>
          <a
            href={`tel:${site.phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-1.5 font-medium hover:text-teal"
          >
            <Phone className="size-3.5" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-20 sm:h-24 flex items-center gap-4">
        <Link to="/" aria-label="ETX Surf Co home">
          <Logo invert />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {nav.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                to={item.href}
                className="h-11 px-3 inline-flex items-center gap-1 text-sm text-foam hover:text-cream"
              >
                {item.label}
                <ChevronDown className="size-3.5 opacity-70" />
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute top-full left-0 pt-2">
                <div className="min-w-56 rounded-lg border border-line-dark bg-navy-2 py-2 shadow-xl">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="block px-4 py-2.5 text-sm text-foam hover:bg-navy-3 hover:text-cream"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link
            to="/contact"
            className="h-11 px-3 inline-flex items-center text-sm text-foam hover:text-cream"
          >
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/favorites"
            className="relative size-11 inline-flex items-center justify-center rounded-md text-cream hover:bg-navy-3"
            aria-label="Saved boats"
          >
            <Heart className="size-5" />
            {favCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-teal text-[10px] font-bold text-cream flex items-center justify-center tabular-nums">
                {favCount}
              </span>
            ) : null}
          </Link>
          {compareCount > 0 ? (
            <Link
              to="/compare"
              className="hidden sm:inline-flex h-10 px-3 rounded-md bg-navy-3 text-xs font-medium text-foam hover:text-cream"
            >
              Compare {compareCount}
            </Link>
          ) : null}
          <Link
            to="/inventory"
            className="hidden sm:inline-flex h-10 px-4 rounded-md bg-teal text-cream text-sm font-medium hover:bg-teal-2"
          >
            Shop boats
          </Link>
          <button
            type="button"
            className="lg:hidden size-11 inline-flex items-center justify-center rounded-md hover:bg-navy-3"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="lg:hidden border-t border-line-dark bg-navy-2 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-1 pb-8">
            {nav.map((item) => (
              <div key={item.label} className="py-2">
                <p className="text-[11px] uppercase tracking-widest text-teal mb-1 px-2">
                  {item.label}
                </p>
                {item.items.map((sub) => (
                  <Link
                    key={sub.href}
                    to={sub.href}
                    className="block px-2 py-3 text-cream border-b border-line-dark"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link to="/contact" className="block px-2 py-3 text-cream">
              Contact
            </Link>
            <a
              href={`tel:${site.phone.replace(/\D/g, "")}`}
              className="mt-3 h-12 rounded-md bg-teal text-cream font-medium inline-flex items-center justify-center"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
