import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/trade-in")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "city", label: "City" },
  { name: "state", label: "State", type: "select" },
  { name: "zip", label: "Zip code" },
  { name: "type", label: "Type of vessel" },
  { name: "make", label: "Make of interest" },
  { name: "model", label: "Model of interest" },
  { name: "year", label: "Year of interest" },
  { name: "tradeMake", label: "Trade-in make", required: true },
  { name: "tradeModel", label: "Trade-in model", required: true },
  { name: "tradeYear", label: "Trade-in year", required: true },
  { name: "hours", label: "Hours" },
  { name: "accessories", label: "Added accessories", span: 2 },
  { name: "comments", label: "Comments / questions", type: "textarea", span: 2 },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Value your trade"
        title="We'll put a number on your current boat"
        lede="Tell us about the vessel you want to roll in. Our desk will follow up with a trade range you can actually use."
        image="/images/site/lot.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="trade-in" fields={fields} submitLabel="Value my trade" />
      </div>
    </>
  );
}
