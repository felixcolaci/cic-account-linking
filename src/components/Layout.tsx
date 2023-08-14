import { useEffect, useState } from "react";
import { useBrandingStore } from "../misc/branding.store";

export const Layout = ({ children }: any) => {
  const branding = useBrandingStore();

  const [backgroundProps, setBackgroundProps] = useState({});

  useEffect(() => {
    const backgroundImageProps = {
      backgroundImage: `url(
        '${branding.backgroundImage}'
      )`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    if (branding.backgroundImage) {
      setBackgroundProps(backgroundImageProps);
    } else if (branding.backgroundColor) {
      setBackgroundProps({
        backgroundColor: branding.backgroundColor,
      });
    }
  }, [branding.backgroundColor, branding.backgroundImage]);

  return (
    <div
      style={{
        maxWidth: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...backgroundProps,
      }}
    >
      {children}
    </div>
  );
};
