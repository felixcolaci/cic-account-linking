import { NextUIProvider, changeTheme } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
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
    changeTheme(newTheme);
    console.log(branding);
  }, [branding]);

  return (
    <NextUIProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  );
};
