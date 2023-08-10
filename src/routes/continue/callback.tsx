import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { useLocation, useNavigate } from "react-router";

import { Auth0Client, User } from "@auth0/auth0-spa-js";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { useSearchParams } from "react-router-dom";

interface LocalState {
  clientId: string;
  domain: string;
  loginHint: string;
  provider: string;
  connection: string;
  action: "dismiss" | "link";
}

export const CallbackePage = () => {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [localState, setLocalState] = useState<LocalState>();
  const [auth0, setAuth0] = useState<Auth0Client>();
  const [user, setUser] = useState<User>();
  const [form, setForm] = useState<HTMLFormElement | null>();

  // form inputs
  const [action, setAction] = useState<string>();
  const [sessionState, setSessionState] = useState<string>();
  const [continueToken, setContinueToken] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);

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
            redirect_uri: `${window.location.origin}/continue`,
          },
          cacheLocation: "localstorage",
        })
      );
    }
  }, [localState]);

  useEffect(() => {
    window.addEventListener("load", async () => {
      if (!auth0) {
        console.log("no auth0 client available");
        return;
      }
      // catch callback
      try {
        await auth0.handleRedirectCallback();
        const user = await auth0.getUser();
        setUser(user);
        searchParams.delete("code");
        searchParams.delete("state");
        setSearchParams(searchParams);
        const token = await auth0.getTokenSilently();
        const config = JSON.parse(localStorage.getItem("config") || "{}");
        return fetch("https://cic-account-linking.netlify.app/.netlify/functions/sign-data", {
          method: "POST",
          body: JSON.stringify({
            link_with: token,
            sessionToken: config.sessionToken,
            state: config.state,
            provider: localState?.provider,
            action: localState?.action,
            user_id: user?.sub,
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
          });
      } catch (error) {
        navigate({
          pathname: "/error",
          search: `?status=401&message=${error}`,
        });
      }
    });
  }, [auth0, localState, navigate, searchParams, setSearchParams, setUser]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const returnToAuth0 = () => {
    if (form) {
      setIsRedirecting(true);
      console.log(form);
      form.submit();
    }
  };

  // progress
  const [progress, setProgress] = useState(3);
  useEffect(() => {
    const calculate = (v: number): number => {
      const value = v > 3 ? 0 : v + -1;
      if (value === 0) {
        returnToAuth0();
      }
      return value;
    };
    const interval = setInterval(() => {
      setProgress((v) => calculate(v));
    }, 1000);

    return () => clearInterval(interval);
  }, [returnToAuth0]);

  return (
    <>
      {isRedirecting ? (
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
      ) : (
        <Card
          shadow="sm"
          style={{
            maxWidth: "500px",
            padding: "1em",
          }}
        >
          <CardBody>
            {user !== undefined ? <p>Successfully verified identity!</p> : <Spinner size="md"></Spinner>}
          </CardBody>
          <CardFooter
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
            <Button type="button" color="primary" variant="solid" onClick={returnToAuth0}>
              Continue ({progress})
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
