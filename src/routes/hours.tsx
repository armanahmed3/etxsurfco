import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { isOpenNow, site } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hours")({ component: Page });

function Page() {
  const [status, setStatus] = useState({ open: false, label: "" });
  useEffect(() => setStatus(isOpenNow()), []);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      <PageHero
        kicker="Map & hours"
        title="Hours of operation & store location"
        lede="317 State Highway 110 S, Whitehouse, TX 75791"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-8">
        <div>
          <p
            className={cn(
              "inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium",
              status.open ? "bg-foam text-teal-3" : "bg-paper-2 text-muted",
            )}
          >
            <span className={cn("size-2 rounded-full", status.open ? "bg-teal" : "bg-muted")} />
            {status.label || "Hours"}
          </p>
          <ul className="mt-6 divide-y divide-line border border-line rounded-xl overflow-hidden bg-cream">
            {site.hours.map((h) => (
              <li
                key={h.day}
                className={cn(
                  "flex justify-between px-4 py-3 text-sm",
                  h.day === today && "bg-foam font-medium",
                )}
              >
                <span>{h.day}</span>
                <span className="tabular-nums">{h.label}</span>
              </li>
            ))}
          </ul>
          <a
            href={site.mapDirections}
            className="mt-6 inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
          >
            Get directions
          </a>
        </div>
        <iframe
          title="Store map"
          src={site.mapEmbed}
          className="w-full min-h-96 rounded-xl border border-line"
          loading="lazy"
        />
      </div>
    </>
  );
}
