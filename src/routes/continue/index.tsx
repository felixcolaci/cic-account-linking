import { Card, CardBody } from "@nextui-org/card";
import { useLocation } from "react-router";

import { Auth0Client } from "@auth0/auth0-spa-js";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

interface LocalState {
  clientId: string;
  domain: string;
  loginHint: string;
  connection: string;
  action: "dismiss" | "link";
}

export const ContinuePage = () => {
  const { state } = useLocation();
  const [localState, setLocalState] = useState<LocalState>();
  const [auth0, setAuth0] = useState<Auth0Client>();

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
    if (localState) {
      setAuth0(
        new Auth0Client({
          clientId: localState.clientId,
          domain: localState.domain,
          authorizationParams: {
            redirect_uri: `${window.location.origin}/continue/callback`,
          },
          cacheLocation: "localstorage",
        })
      );
    }
  }, [localState]);

  useEffect(() => {
    auth0?.loginWithRedirect({
      authorizationParams: {
        connection: localState?.connection,
        login_hint: localState?.loginHint,
        no_link: true,
      },
    });
  }, [auth0, localState]);

  return (
    <Card
      shadow="sm"
      style={{
        maxWidth: "500px",
        padding: "1em",
      }}
    >
      <CardBody>
        <Spinner size="md"></Spinner>
      </CardBody>
    </Card>
  );
};
