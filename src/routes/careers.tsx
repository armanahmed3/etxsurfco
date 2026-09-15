import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/careers")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "address", label: "Address", span: 2 },
  { name: "city", label: "City" },
  { name: "state", label: "State", type: "select" },
  { name: "zip", label: "Zip code" },
  {
    name: "interest",
    label: "Area of interest",
    type: "select",
    required: true,
    options: [
      "Sales",
      "Administration/Office",
      "Financing",
      "Parts and Accessories",
      "Service",
      "Apparel",
      "Other",
    ],
  },
  { name: "comments", label: "Comments / questions", type: "textarea", span: 2, required: true },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Employment"
        title="Come work on the lot"
        lede="Sales, service, parts, office — tell us where you fit. We're in Whitehouse, Texas."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="career" fields={fields} submitLabel="Submit application" />
      </div>
    </>
  );
}
