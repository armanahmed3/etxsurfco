import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/parts/")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Parts department"
        title="OEM parts and the odd piece nobody else stocks"
        lede="Whether you need repairs, maintenance, or you want to customize your boat, we keep a wide selection for the Whitehouse area. If we don't have it in stock, we order it."
        image="/images/site/parts.jpg"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-6">
        <p className="text-ink-soft leading-relaxed">
          Our knowledgeable parts staff are ready to help you find the right parts and
          accessories to keep your watercraft running in optimal condition. If you need
          help with repairs or installations, check out our Service Department.
        </p>
        <p className="text-ink-soft">
          Call us at{" "}
          <a href="tel:9034713240" className="text-teal font-medium">
            (903) 471-3240
          </a>
          , come on in, or send a parts request.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/parts/request"
            className="h-12 px-6 rounded-lg bg-teal text-cream font-medium inline-flex items-center"
          >
            Parts request
          </Link>
          <Link
            to="/service"
            className="h-12 px-6 rounded-lg border border-line font-medium inline-flex items-center"
          >
            Service department
          </Link>
        </div>
      </div>
    </>
  );
}
