import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/privacy")({ component: Page });

function Page() {
  return (
    <>
      <PageHero kicker="Privacy" title="How we handle your information" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-4 text-ink-soft leading-relaxed">
        <p>
          Quote, service, parts, financing, newsletter, and career forms collect the
          information you type so we can respond. We do not sell that information.
        </p>
        <p>
          Saved boats and compare lists live in your browser (local storage) and are
          not sent to us until you submit a form.
        </p>
        <p>
          California residents may have additional rights under the CCPA. Email
          brenda@marineworldoftexas.com to request access or deletion of information
          you have submitted to the dealership.
        </p>
        <p>Last updated 2026.</p>
      </div>
    </>
  );
}
