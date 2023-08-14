import { Card } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useBrandingStore } from "../misc/branding.store";

export const Error = () => {
  const [searchParams] = useSearchParams();
  const branding = useBrandingStore();
  const DEFAULT_TITLE = "Link your Accounts";
  return (
    <Card
      className="fullscreenOnMobile"
      style={{
        maxWidth: "500px",
        padding: "1em",
      }}
    >
      <Card.Header
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {branding.logoUrl ? <img alt="logo" src={branding.logoUrl} height="50px" /> : ""}
        <h2>{branding.title ? branding.title : DEFAULT_TITLE}</h2>
      </Card.Header>
      <Card.Body>
        <h1 className="text-large text-bold">Error: {searchParams.get("status")}</h1>
        <p>{searchParams.get("message")}</p>
      </Card.Body>
    </Card>
  );
};
