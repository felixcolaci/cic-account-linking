import { createTheme } from "@nextui-org/react";
import { Branding } from "./branding.store";
export const getTheme = (branding: Branding) => {
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
  console.log(themeProps);
  return createTheme(themeProps);
};
