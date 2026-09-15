import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Inquiry = {
  id: string;
  kind: string;
  createdAt: string;
  fields: Record<string, string>;
};

type AppState = {
  favorites: string[];
  compare: string[];
  inquiries: Inquiry[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  addInquiry: (kind: string, fields: Record<string, string>) => Inquiry;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      compare: [],
      inquiries: [],
      toggleFavorite: (id) => {
        const has = get().favorites.includes(id);
        set({
          favorites: has
            ? get().favorites.filter((x) => x !== id)
            : [...get().favorites, id],
        });
      },
      toggleCompare: (id) => {
        const cur = get().compare;
        if (cur.includes(id)) {
          set({ compare: cur.filter((x) => x !== id) });
          return;
        }
        if (cur.length >= 3) {
          set({ compare: [...cur.slice(1), id] });
          return;
        }
        set({ compare: [...cur, id] });
      },
      clearCompare: () => set({ compare: [] }),
      addInquiry: (kind, fields) => {
        const inquiry: Inquiry = {
          id: crypto.randomUUID(),
          kind,
          createdAt: new Date().toISOString(),
          fields,
        };
        set({ inquiries: [inquiry, ...get().inquiries].slice(0, 50) });
        return inquiry;
      },
    }),
    { name: "etx-surf-co" },
  ),
);
