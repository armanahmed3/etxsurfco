import { createFileRoute } from "@tanstack/react-router";
import { InventoryBrowser } from "@/components/inventory-browser";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/inventory/used")({ component: Page });

function Page() {
  return (
    <>
      <PageHero
        kicker="Pre-owned"
        title="Already lake-proven"
        lede="Inspected Axis, Malibu, Sanger, Regal, Glastron, and Crownline. Hours listed. No mystery boats."
        image="/images/site/lot.jpg"
      />
      <InventoryBrowser preset="Pre-Owned" />
    </>
  );
}
