import { createFileRoute } from "@tanstack/react-router";
import { InventoryBrowser } from "@/components/inventory-browser";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/inventory/new")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="New boats"
        title="Factory-fresh inventory"
        lede="2025–2027 Malibu, Axis, Supra, and Thor. Priced where we can, quoted where the build is still flexible."
        image="/images/site/hero-dock.jpg"
      />
      <InventoryBrowser preset="New" />
    </>
  );
}
