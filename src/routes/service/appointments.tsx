import { createFileRoute } from "@tanstack/react-router";
import { LeadForm, type FormField } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/service/appointments")({ component: Page });

const fields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "address", label: "Address", span: 2 },
  { name: "city", label: "City" },
  { name: "state", label: "State", type: "select" },
  { name: "zip", label: "Zip code" },
  { name: "make", label: "Make", required: true },
  { name: "model", label: "Model", required: true },
  { name: "year", label: "Year" },
  { name: "hin", label: "HIN #" },
  { name: "hours", label: "Hours" },
  { name: "date", label: "Appointment date", type: "date", required: true },
  { name: "before", label: "Have we serviced your vessel before?", type: "select", options: ["Yes", "No"] },
  { name: "lastIn", label: "Last in" },
  { name: "workDone", label: "Work done previously", span: 2 },
  { name: "needs", label: "Describe service needs", type: "textarea", span: 2, required: true },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="Service request"
        title="Book a slot in the shop"
        lede="Call (903) 471-3240 if it is urgent. Otherwise the form is enough — we'll confirm a date."
        image="/images/site/service.jpg"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <LeadForm kind="service" fields={fields} submitLabel="Request appointment" />
      </div>
    </>
  );
}
