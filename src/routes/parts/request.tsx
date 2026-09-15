import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/parts/request")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "address", label: "Address", span: 2 },
  { name: "city", label: "City" },
  { name: "state", label: "State", type: "select" },
  { name: "zip", label: "Zip code" },
  { name: "type", label: "Type of vessel" },
  { name: "make", label: "Make", required: true },
  { name: "model", label: "Model", required: true },
  { name: "year", label: "Year" },
  { name: "hin", label: "HIN #" },
  { name: "hours", label: "Hours" },
  { name: "partNumber", label: "Do you have a part number?" },
  { name: "parts", label: "What kind of parts are needed?", type: "textarea", span: 2, required: true },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Parts request"
        title="Tell us the number — or describe the piece"
        lede="ETX Surf Co is committed to your privacy. We'll confirm availability and price before we order."
        image="/images/site/parts.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="parts" fields={fields} submitLabel="Send parts request" />
      </div>
    </>
  );
}
