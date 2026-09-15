import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/financing/prequalify")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "city", label: "City" },
  { name: "state", label: "State", type: "select" },
  { name: "zip", label: "Zip code" },
  { name: "amount", label: "Requested amount" },
  { name: "boat", label: "Boat of interest", span: 2 },
  { name: "comments", label: "Notes", type: "textarea", span: 2 },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Get prequalified"
        title="Start the credit conversation here"
        lede="This is a dealer request, not a hard pull. We'll follow up with next steps and, when it fits, Sheffield Financial for repowers."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="prequalify" fields={fields} submitLabel="Request prequalification" />
      </div>
    </>
  );
}
