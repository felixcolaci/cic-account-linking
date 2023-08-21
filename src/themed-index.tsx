import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import App from "./App";
import { useBrandingStore } from "./misc/branding.store";
import { useEffect, useState } from "react";
import { getTheme } from "./misc/theme";

export const ThemedIndex = () => {
  const [searchParams] = useSearchParams();
  const branding = useBrandingStore();

  const [theme, setTheme] = useState<any>();

  useEffect(() => {
    const newTheme = getTheme(branding);
    setTheme(newTheme);
    if (searchParams.has("branding")) {
      const localBranding = JSON.parse(atob(searchParams.get("branding") || "{}"));
      branding.setConfig(localBranding);
      setTheme(getTheme(localBranding));
      searchParams.delete("branding");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NextUIProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  );
};
