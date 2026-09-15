import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, contactFields } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Contact us"
        title="We welcome your feedback and comments"
        lede="Questions about a hull, a part, a service slot, or financing — email, phone, or the form. We'll get back to you."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <aside className="rounded-xl bg-navy text-cream p-6 h-fit">
          <h2 className="font-display text-2xl">The desk</h2>
          <p className="mt-3 text-foam text-sm leading-relaxed">{site.fullAddress}</p>
          <a href="tel:9034713240" className="mt-4 block text-xl font-display text-teal">
            {site.phoneDisplay}
          </a>
          {site.emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className="block mt-2 text-sm text-foam hover:text-cream">
              {e}
            </a>
          ))}
          <p className="mt-6 text-xs uppercase tracking-widest text-teal">Hours</p>
          <ul className="mt-2 space-y-1 text-sm text-foam">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="tabular-nums">{h.label}</span>
              </li>
            ))}
          </ul>
        </aside>
        <LeadForm
          kind="contact"
          fields={contactFields}
          intro="If you need help with any aspect of the buying process, please don't hesitate. Our customer service representatives will be happy to assist you."
        />
      </div>
    </>
  );
}
