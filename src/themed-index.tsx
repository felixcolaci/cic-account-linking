import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import { useBrandingStore } from "./misc/branding.store";
import { useEffect, useState } from "react";
import { getTheme } from "./misc/theme";

export const ThemedIndex = () => {
  const branding = useBrandingStore();

  const [theme, setTheme] = useState<any>();

  useEffect(() => {
    const newTheme = getTheme(branding);
    setTheme(newTheme);
    const query = new URLSearchParams(window.location.search);
    if (query.has("branding")) {
      const localBranding = JSON.parse(atob(query.get("branding") || "{}"));
      branding.setConfig(localBranding);
      setTheme(getTheme(localBranding));
      query.delete("branding");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NextUIProvider theme={theme}>
      <App />
    </NextUIProvider>
  );
};
