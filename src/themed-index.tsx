import { NextUIProvider, changeTheme } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useBrandingStore } from "./misc/branding.store";
import { useEffect } from "react";
import { getTheme } from "./misc/theme";

export const ThemedIndex = () => {
  const branding = useBrandingStore();

  // const [theme, setTheme] = useState<any>();

  useEffect(() => {
    const newTheme = getTheme(branding);
    changeTheme(newTheme);
    console.log("root", branding);
  }, [branding]);

  return (
    <NextUIProvider theme={getTheme(branding)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  );
};
