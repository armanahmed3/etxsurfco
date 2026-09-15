import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/desk";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  span?: 1 | 2;
  placeholder?: string;
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export function LeadForm({
  kind,
  fields,
  submitLabel = "Submit",
  intro,
}: {
  kind: string;
  fields: FormField[];
  submitLabel?: string;
  intro?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !String(values[f.name] ?? "").trim()) {
        setError(`Please fill in ${f.label}.`);
        return;
      }
    }
    setBusy(true);
    setError(null);
    try {
      const rec = await submitLead({ data: { kind, fields: values } });
      setDone(rec.id.slice(0, 8).toUpperCase());
    } catch {
      setError("Could not send. Please call (903) 471-3240.");
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-cream p-8 text-center">
        <CheckCircle2 className="size-10 text-teal mx-auto mb-3" />
        <h3 className="font-display text-2xl">Request received</h3>
        <p className="mt-2 text-muted max-w-md mx-auto">
          Reference <span className="font-semibold text-ink tabular-nums">{done}</span>.
          Our Whitehouse desk will follow up shortly. You can also call{" "}
          <a href="tel:9034713240" className="text-teal">
            (903) 471-3240
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-line bg-cream p-5 sm:p-8">
      {intro ? <p className="text-muted mb-6">{intro}</p> : null}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <Field
            key={f.name}
            label={f.label}
            required={f.required}
            className={f.span === 2 ? "sm:col-span-2" : undefined}
          >
            {f.type === "textarea" ? (
              <Textarea
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            ) : f.type === "select" ? (
              <Select
                name={f.name}
                required={f.required}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              >
                <option value="">Select</option>
                {(f.options ?? (f.name.toLowerCase().includes("state") ? US_STATES : [])).map(
                  (o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ),
                )}
              </Select>
            ) : (
              <Input
                type={f.type ?? "text"}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            )}
          </Field>
        ))}
      </div>
      {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
      <p className="mt-4 text-xs text-muted">
        Asterisk indicates a required field. We never sell your information.
      </p>
      <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto" disabled={busy}>
        {busy ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

export const contactFields: FormField[] = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "address", label: "Address", span: 2 },
  { name: "city", label: "City" },
  { name: "state", label: "State", type: "select" },
  { name: "zip", label: "Zip code" },
  {
    name: "comments",
    label: "Comments / questions",
    type: "textarea",
    span: 2,
    required: true,
  },
];
