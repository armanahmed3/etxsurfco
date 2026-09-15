import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { services } from "@/data/content";

export const Route = createFileRoute("/service/")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Service department"
        title="Get you in, get you out, get you back on the lake"
        lede="When you're invested in making sure your watercraft stays in great working order, you need knowledge and skill you can count on. Our technicians are dedicated to maintaining and servicing your boat so you can get the most out of the purchase."
        image="/images/site/service.jpg"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <p className="text-ink-soft leading-relaxed max-w-3xl">
          Here at ETX Surf Co we are boating enthusiasts, and we understand that your
          priority is getting out on the water. We have the equipment and experience
          to get your boat in prime shape — fishing, cruising, or tow sports. Give us
          a call and we'll get you in and out of the shop in an efficient and timely
          manner. We are proud to provide quality service in the Whitehouse area.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={s.href}
              className="rounded-xl overflow-hidden border border-line bg-cream"
            >
              <img src={s.image} alt="" className="h-32 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-1 text-xs text-muted">{s.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/service/appointments"
          className="mt-8 inline-flex h-12 px-6 rounded-lg bg-teal text-cream font-medium items-center"
        >
          Schedule service
        </Link>
      </div>
    </>
  );
}
