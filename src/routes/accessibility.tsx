import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/accessibility")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel" },
  {
    name: "issue",
    label: "Issue you experienced or suggestion for improvement",
    type: "textarea",
    span: 2,
    required: true,
  },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Accessibility"
        title="We want every visitor to use this site"
        lede="If you encounter content or features that are not accessible, tell us the page and what failed. We will work the issue."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <p className="mb-8 text-ink-soft leading-relaxed">
          As a dealer, we make every attempt to ensure prices, promotions, events, hours,
          and location are understandable. Contact ETX Surf Co customer support via the
          form below or call (903) 471-3240.
        </p>
        <LeadForm kind="accessibility" fields={fields} submitLabel="Submit accessibility report" />
      </div>
    </>
  );
}
