import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo invert />
          <p className="mt-4 text-sm text-foam leading-relaxed">
            {site.tagline} in {site.city}, {site.region}.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={site.social.facebook}
              className="size-11 rounded-md bg-navy-3 inline-flex items-center justify-center hover:bg-teal"
              aria-label="Facebook"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              className="size-11 rounded-md bg-navy-3 inline-flex items-center justify-center hover:bg-teal"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={site.social.tiktok}
              className="size-11 rounded-md bg-navy-3 inline-flex items-center justify-center hover:bg-teal text-xs font-bold"
              aria-label="TikTok"
            >
              TT
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-teal mb-3">
            Quick links
          </p>
          <ul className="space-y-2 text-sm text-foam">
            <li>
              <Link to="/inventory/new" className="hover:text-cream">
                New boats
              </Link>
            </li>
            <li>
              <Link to="/inventory/used" className="hover:text-cream">
                Used boats
              </Link>
            </li>
            <li>
              <Link to="/service" className="hover:text-cream">
                Service
              </Link>
            </li>
            <li>
              <Link to="/parts" className="hover:text-cream">
                Parts
              </Link>
            </li>
            <li>
              <Link to="/service/ceramic" className="hover:text-cream">
                Ceramic coating
              </Link>
            </li>
            <li>
              <Link to="/service/storage" className="hover:text-cream">
                Winterization
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-cream">
                Events
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-teal mb-3">
            Visit us
          </p>
          <p className="text-sm text-foam leading-relaxed">
            {site.addressLine}
            <br />
            {site.cityStateZip}
          </p>
          <a
            href={`tel:${site.phone.replace(/\D/g, "")}`}
            className="mt-3 inline-flex items-center gap-2 text-cream font-medium"
          >
            <Phone className="size-4 text-teal" />
            {site.phoneDisplay}
          </a>
          <p className="mt-3 text-xs text-foam">
            Mon–Fri 9–6 · Sat 9–3 · Sun closed
          </p>
          <Link
            to="/hours"
            className="mt-3 inline-block text-sm text-teal hover:underline"
          >
            Map & directions
          </Link>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-teal mb-3">
            Desk
          </p>
          <ul className="space-y-2 text-sm text-foam">
            <li>
              <a href={`mailto:${site.emails[0]}`} className="hover:text-cream">
                {site.emails[0]}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.emails[1]}`} className="hover:text-cream">
                {site.emails[1]}
              </a>
            </li>
            <li>
              <Link to="/financing" className="hover:text-cream">
                Financing
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-cream">
                Employment
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-foam">
          <p>© {new Date().getFullYear()} ETX Surf Co. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/policy" className="hover:text-cream">
              Policy
            </Link>
            <Link to="/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-cream">
              Terms
            </Link>
            <Link to="/accessibility" className="hover:text-cream">
              Accessibility
            </Link>
            <Link to="/sitemap" className="hover:text-cream">
              Site map
            </Link>
            <Link to="/login" className="hover:text-cream">
              Staff desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
