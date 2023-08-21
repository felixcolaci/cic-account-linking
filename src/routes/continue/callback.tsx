import { Loading } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router";

import { Auth0Client, User } from "@auth0/auth0-spa-js";
import { useEffect, useState } from "react";
import { useBrandingStore } from "../../misc/branding.store";

interface LocalState {
  clientId: string;
  domain: string;
  loginHint: string;
  provider: string;
  connection: string;
  action: "dismiss" | "link";
}

const getAuth0Client = () => {
  const state = localStorage.getItem("state");
  const config = localStorage.getItem("config");
  if (state == null || config == null) {
    throw new Error("config not present");
  }
  const localState = JSON.parse(state) as LocalState;
  const localConfig = JSON.parse(config);
  if (localState.domain !== localConfig.ui_client.domain) {
    throw new Error("invalid config");
  }
  return new Auth0Client({
    clientId: localState.clientId,
    domain: localState.domain,
    authorizationParams: {
      redirect_uri: `${window.location.origin}/continue`,
    },
    cacheLocation: "localstorage",
  });
};

export const CallbackePage = () => {
  const branding = useBrandingStore();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [localState, setLocalState] = useState<LocalState>();
  const [auth0, setAuth0] = useState<Auth0Client>();
  const [user, setUser] = useState<User>();
  const [form, setForm] = useState<HTMLFormElement | null>();

  // form inputs
  const [formAction, setAction] = useState<string>();
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
            redirect_uri: `${window.location.origin}/continue/callback`,
          },
          cacheLocation: "localstorage",
        })
      );
    }
  }, [localState]);

  useEffect(() => {
    window.addEventListener("load", async () => {
      if (!auth0) {
        try {
          setAuth0(getAuth0Client());
          console.log(auth0);
        } catch (error) {
          console.log(error);
          navigate({
            pathname: "/error",
            search: `?status=401&message=${error}`,
          });
        }
      }
      // catch callback
      try {
        await auth0?.handleRedirectCallback();
        const user = await auth0?.getUser();
        setUser(user);
        //searchParams.delete("code");
        //searchParams.delete("state");
        //setSearchParams(searchParams);
        const token = await auth0?.getTokenSilently();
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
            const newAction = `https://${config.ui_client.domain}/continue?state=${config.state}`;
            console.log(newAction);
            setAction(newAction);
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const returnToAuth0 = () => {
    if (form) {
      console.log(form);
      setIsRedirecting(true);
      form.submit();
      branding.reset();
    } else {
      console.log("form is undefined");
    }
  };

  return (
    <>
      {isRedirecting ? (
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
        </Card>
      ) : (
        <Card
          className="fullscreenOnMobile"
          style={{
            maxWidth: "500px",
            padding: "1em",
          }}
        >
          <Card.Body>
            {user !== undefined ? <p>Successfully verified identity!</p> : <Loading size="md"></Loading>}
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
              action={formAction}
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
            <p>{formAction}</p>
            <p>{continueToken}</p>
            <p>{state}</p>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};
