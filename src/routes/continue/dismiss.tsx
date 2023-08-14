import { Card, Loading } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router";

import { useEffect, useState } from "react";

interface LocalState {
  clientId: string;
  domain: string;
  loginHint: string;
  provider: string;
  connection: string;
  action: "dismiss" | "link";
}

export const DismissPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [localState, setLocalState] = useState<LocalState>();
  const [form, setForm] = useState<HTMLFormElement | null>();

  // form inputs
  const [action, setAction] = useState<string>();
  const [sessionState, setSessionState] = useState<string>();
  const [continueToken, setContinueToken] = useState<string>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const returnToAuth0 = () => {
    if (form) {
      form.submit();
    }
  };
  useEffect(() => {
    if (state) {
      localStorage.setItem("state", JSON.stringify(state));
      setLocalState(state);
    } else {
      const oldState = JSON.parse(localStorage.getItem("state") || "{}");
      setLocalState(oldState);
    }
  }, [setLocalState, state]);

  useEffect(() => {
    try {
      const config = JSON.parse(localStorage.getItem("config") || "{}");
      fetch("https://cic-account-linking.netlify.app/.netlify/functions/sign-data", {
        method: "POST",
        body: JSON.stringify({
          sessionToken: config.sessionToken,
          state: config.state,
          action: localState?.action,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const config = JSON.parse(localStorage.getItem("config") || "{}");
          setAction(`https://${config.ui_client.domain}/continue?state=${config.state}`);
          setSessionState(config.state);
          setContinueToken(response.token);
          returnToAuth0();
        });
    } catch (error) {
      navigate({
        pathname: "/error",
        search: `?status=401&message=${error}`,
      });
    }
  }, [localState?.action, navigate, returnToAuth0]);

  // progress

  return (
    <Card
      className="fullscreenOnMobile"
      style={{
        maxWidth: "500px",
        padding: "1em",
      }}
    >
      <Card.Body>
        <Loading size="md"></Loading>
      </Card.Body>
      <Card.Footer
        style={{
          display: "flex",
          flexDirection: "column",

          gap: "1em",
        }}
      >
        <form
          method="post"
          id="returnToAuth0"
          action={action}
          ref={(ref) => {
            setForm(ref);
          }}
        >
          <input
            type="hidden"
            name="continueToken"
            value={continueToken}
            onChange={(e) => setContinueToken(e.target.value)}
          ></input>
          <input
            type="hidden"
            name="state"
            value={sessionState}
            onChange={(e) => setSessionState(e.target.value)}
          ></input>
        </form>
      </Card.Footer>
    </Card>
  );
};
