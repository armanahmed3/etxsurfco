import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/reviews/submit")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "rating",
    label: "Overall rating",
    type: "select",
    required: true,
    options: ["5", "4", "3", "2", "1"],
  },
  { name: "review", label: "Your testimonial", type: "textarea", span: 2, required: true },
];

function Page() {
  return (
    <>
      <PageHero kicker="Submit a testimonial" title="Tell the next buyer how it went" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="review" fields={fields} submitLabel="Submit review" />
      </div>
    </>
  );
}
