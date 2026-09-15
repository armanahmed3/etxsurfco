import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/service/detailing")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Boat detailing"
        title="Gelcoat that looks like launch day"
        lede="Interior deep-clean, oxidation correction, stainless brightening, and UV protection sized for East Texas sun."
        image="/images/site/detailing.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-5 text-ink-soft leading-relaxed">
        <p>
          Lake water, sunscreen, and Texas UV will haze a hull in one season. Our
          detailing desk treats wake boats, pontoons, and aluminum differently —
          because they fail differently.
        </p>
        <ul className="space-y-2">
          {[
            "Wash, clay, and machine polish",
            "Vinyl clean and UV protectant",
            "Carpet extraction where equipped",
            "Stainless and windshield care",
            "Engine-bay wipe and odor control",
          ].map((t) => (
            <li key={t} className="pl-4 border-l-2 border-teal">
              {t}
            </li>
          ))}
        </ul>
        <Link
          to="/service/appointments"
          className="inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
        >
          Book detailing
        </Link>
      </div>
    </>
  );
}
