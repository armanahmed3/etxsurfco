import { createFileRoute } from "@tanstack/react-router";
import { InventoryBrowser } from "@/components/inventory-browser";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/inventory/")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Showroom"
        title="All inventory"
        lede="Sixteen boats on the Whitehouse lot — new Malibu, Axis, Supra, and Thor, plus a tight pre-owned list. Filter by make, price, and category."
        image="/images/site/lot.jpg"
      />
      <InventoryBrowser />
    </>
  );
}
