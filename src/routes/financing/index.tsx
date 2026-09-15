import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Field, Input, Select } from "@/components/ui/input";

export const Route = createFileRoute("/financing/")({ component: Page });

function monthlyPayment(principal: number, apr: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = apr / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

function Page() {
  const [price, setPrice] = useState(89995);
  const [down, setDown] = useState(10000);
  const [apr, setApr] = useState(7.9);
  const [term, setTerm] = useState(144);
  const payment = useMemo(
    () => monthlyPayment(Math.max(price - down, 0), apr, term),
    [price, down, apr, term],
  );

  return (
    <>
      <PageHero
        kicker="Finance department"
        title="A plan that gets you on the water"
        lede="We are boating and watersports enthusiasts. If you're considering financing a new boat from the brands we carry, you're in good hands with our finance desk in Whitehouse."
        image="/images/site/hero-dock.jpg"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-10">
        <div>
          <p className="text-ink-soft leading-relaxed">
            Our knowledgeable finance staff is here to make purchasing a boat easy.
            Apply now and we'll contact you about available options — including
            Sheffield Financial repower programs.
          </p>
          <Link
            to="/financing/prequalify"
            className="mt-6 inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
          >
            Apply / get prequalified
          </Link>
        </div>
        <div className="rounded-xl border border-line bg-cream p-6">
          <h2 className="font-display text-2xl">Payment sketch</h2>
          <p className="text-xs text-muted mt-1">
            Estimate only — not a credit decision. Rates vary.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="Boat price">
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Field>
            <Field label="Down payment">
              <Input
                type="number"
                value={down}
                onChange={(e) => setDown(Number(e.target.value))}
              />
            </Field>
            <Field label="APR %">
              <Input
                type="number"
                step="0.1"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
              />
            </Field>
            <Field label="Term">
              <Select value={String(term)} onChange={(e) => setTerm(Number(e.target.value))}>
                {[60, 84, 120, 144, 180, 240].map((m) => (
                  <option key={m} value={m}>
                    {m / 12} years ({m} mo)
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <p className="mt-6 font-display text-4xl text-teal tabular-nums">
            {payment.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            <span className="text-base text-muted font-sans"> /mo</span>
          </p>
        </div>
      </div>
    </>
  );
}
