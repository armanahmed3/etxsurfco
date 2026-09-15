import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { boats } from "@/data/boats";

type Search = { boat?: string };

export const Route = createFileRoute("/quote")({
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
    { name: "cell", label: "Cell phone", type: "tel" },
    { name: "work", label: "Work phone", type: "tel" },
    {
      name: "vessel",
      label: "Boat of interest",
      span: 2,
      placeholder: match?.title,
    },
    { name: "make", label: "Make", placeholder: match?.make },
    { name: "model", label: "Model", placeholder: match?.model },
    { name: "year", label: "Year", placeholder: match ? String(match.year) : "" },
    { name: "hin", label: "HIN #" },
    { name: "hours", label: "Hours" },
    { name: "accessories", label: "Added accessories", span: 2 },
    { name: "comments", label: "Comments / questions", type: "textarea", span: 2, required: true },
  ];
  return (
    <>
      <PageHero
        kicker="Get a quote · Sell us your boat"
        title={match ? `Quote: ${match.title}` : "Quote or consignment"}
        lede="No expensive classified ads. No title or tax worries. We handle payoff paperwork. We buy from individuals, businesses, banks, and even other dealers — or we sell on consignment."
        image="/images/site/lot.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <ul className="mb-8 grid sm:grid-cols-2 gap-2 text-sm text-ink-soft">
          {[
            "No need for expensive classified advertising",
            "No title or tax worries — it's quick and easy",
            "No late-night phone calls or texts",
            "We handle all payoff paperwork",
            "No lengthy inspections or boat demos required to start",
            "Consignment or outright purchase",
          ].map((t) => (
            <li key={t} className="pl-4 border-l-2 border-teal">
              {t}
            </li>
          ))}
        </ul>
        <LeadForm kind="quote" fields={fields} submitLabel="Request a quote" />
      </div>
    </>
  );
}
