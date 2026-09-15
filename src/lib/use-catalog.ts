import { useEffect, useState } from "react";
import { boats as seedBoats, type Boat } from "@/data/boats";
import { listPublicBoats } from "@/lib/desk";

export function useCatalog() {
  const [boats, setBoats] = useState<Boat[]>(seedBoats);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let live = true;
    listPublicBoats()
      .then((rows) => {
        if (!live) return;
        if (rows.length) setBoats(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (live) setReady(true);
      });
    return () => {
      live = false;
    };
  }, []);

  return { boats, ready };
}
