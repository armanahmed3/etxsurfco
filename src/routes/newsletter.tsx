import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/newsletter")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true, span: 2 },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Newsletter"
        title="New hulls, service specials, lake days"
        lede="A short note when it matters. No daily noise."
      />
      <div className="mx-auto max-w-xl px-4 sm:px-6 py-12">
        <LeadForm kind="newsletter" fields={fields} submitLabel="Subscribe" />
      </div>
    </>
  );
}
