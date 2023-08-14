import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface Branding {
  backgroundImage?: string;
  backgroundColor?: string;
  primaryColor?: string;
  buttons?: {
    style?: "rounded" | "pill" | "sharp";
    borderRadius?: number;
    borderWeight?: number;
  };
  logoUrl?: string;
  title?: string;
}
export type BrandingStore = Branding & {
  setConfig(branding: Branding): void;
  reset(): void;
};
export const useBrandingStore = create<BrandingStore>()(
  persist(
    (set) => ({
      setConfig: (branding: Branding) => set((state) => ({ ...state, ...branding })),
      reset: () => set(() => ({})),
    }),
    { name: "branding-store" }
  )
);
