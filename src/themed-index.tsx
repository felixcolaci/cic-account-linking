import { NextUIProvider, createTheme } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useBrandingStore } from "./misc/branding.store";
import { useEffect, useState } from "react";

export const ThemedIndex = () => {
  const branding = useBrandingStore();
  console.log(branding);

  const [theme, setTheme] = useState<any>();

  useEffect(() => {
    const themeProps: any = {
      type: "light",
      theme: {
        colors: {},
      },
    };
    if (branding.primaryColor) {
      themeProps.theme.colors.primary = branding.primaryColor;
      themeProps.theme.colors.link = branding.primaryColor;
    }

    const newTheme = createTheme(themeProps);
    setTheme(newTheme);
  }, [branding]);

  return (
    <NextUIProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  );
};
