import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LinkingRequest } from "../../misc/linking-request";
import { Widget } from "./components/widget";
import { useBrandingStore } from "../../misc/branding.store";
import { getTheme } from "../../misc/theme";
import { changeTheme } from "@nextui-org/react";

export const StartPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [config, setConfig] = useState<LinkingRequest | undefined>(undefined);
  const setBrandingConfig = useBrandingStore((state) => state.setConfig);
  const resetBranding = useBrandingStore((state) => state.reset);

  useEffect(() => {
    fetch("https://cic-account-linking.netlify.app/.netlify/functions/verify-session", {
      method: "POST",
      body: JSON.stringify({ sessionToken: searchParams.get("session_token") }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.status) {
          localStorage.setItem(
            "config",
            JSON.stringify({
              ...res,
              sessionToken: searchParams.get("session_token"),
              state: searchParams.get("state"),
            })
          );
          setConfig(res);
          setBrandingConfig(res.branding);
          changeTheme(getTheme(res.branding));
        } else {
          navigate({
            pathname: "/error",
            search: `?status=${res.status}&message=${res.message}`,
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!config ? <h1>Loading</h1> : <Widget {...config}>Loaded</Widget>}</>;
};
