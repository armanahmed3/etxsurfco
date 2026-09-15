import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { boats } from "@/data/boats";

type Search = { boat?: string };
export const Route = createFileRoute("/schedule")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    boat: typeof s.boat === "string" ? s.boat : undefined,
  }),
  component: Page,
});

function Page() {
  const { boat } = Route.useSearch();
  const match = boats.find((b) => b.slug === boat);
  const fields: FormField[] = [
    { name: "firstName", label: "First name", required: true },
    { name: "lastName", label: "Last name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "address", label: "Address", span: 2 },
    { name: "city", label: "City" },
    { name: "state", label: "State", type: "select" },
    { name: "zip", label: "Zip code" },
    { name: "date", label: "Date of viewing", type: "date", required: true },
    {
      name: "vessel",
      label: "Vessel you want to view",
      required: true,
      placeholder: match?.title,
      span: 2,
    },
  ];
  return (
    <>
      <PageHero
        kicker="Schedule a viewing"
        title="Walk the lot. Sit in the boat."
        lede="Pick a day. Tell us which hull. We'll have keys, the folder, and a quiet corner of the showroom."
        image="/images/site/hero-dock.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="viewing" fields={fields} submitLabel="Book viewing" />
      </div>
    </>
  );
}
