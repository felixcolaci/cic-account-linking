import { Branding } from "./branding.store";

export const buttonRadius = (branding: Branding) => {
  const styles: React.CSSProperties = {};

  if (branding.buttons?.borderRadius) {
    styles.borderRadius = branding.buttons.borderRadius;
  }

  if (branding.buttons?.style) {
    switch (branding.buttons.style) {
      case "rounded":
        styles.borderRadius = branding.buttons.borderRadius || "5px";
        break;
      case "pill":
        styles.borderRadius = "9999px";
        break;
      case "sharp":
        styles.borderRadius = 1;
        break;
    }
  }
  return styles;
};

export const colors = (branding: Branding) => {
  const styles: React.CSSProperties = {};

  if (branding.primaryColor) {
    styles.backgroundColor = `${branding.primaryColor} !important`;
  }

  return styles;
};
export const colorsLight = (branding: Branding) => {
  const styles: React.CSSProperties = {};

  if (branding.primaryColor) {
    styles.color = `${branding.primaryColor} !important`;
  }

  return styles;
};
export const colorsProgress = (branding: Branding) => {
  const styles: React.CSSProperties = {};

  if (branding.primaryColor) {
    styles.borderColor = `${branding.primaryColor} !important`;
  }

  return styles;
};