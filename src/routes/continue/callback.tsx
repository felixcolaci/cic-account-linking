import { Loading } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router";

import { Auth0Client, User } from "@auth0/auth0-spa-js";
import { useEffect, useRef, useState } from "react";
import { useBrandingStore } from "../../misc/branding.store";
import { useSubmit } from "react-router-dom";

interface LocalState {
  clientId: string;
  domain: string;
  loginHint: string;
  provider: string;
  connection: string;
  action: "dismiss" | "link";
}

export const CallbackePage = () => {
  const branding = useBrandingStore();
  const { state } = useLocation();
  const navigate = useNavigate();
  

  const [localState, setLocalState] = useState<LocalState>();
  const [user, setUser] = useState<User>();
  const formRef = useRef<HTMLFormElement>(null);

  const [isRedirecting] = useState(false);

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
    const client = new Auth0Client({
      clientId: localState.clientId,
      domain: localState.domain,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/continue`,
      },
      cacheLocation: "localstorage",
    });
    return client;
  };

  useEffect(() => {
    if (state) {
      localStorage.setItem("state", JSON.stringify(state));
    }
    setLocalState(JSON.parse(localStorage.getItem("state") || "{}"));

    const auth0 = getAuth0Client();

    window.addEventListener("load", async () => {
      if (!auth0) {
        navigate({
          pathname: "/error",
          search: `?status=401&message=${"auth0 client was undefined"}`,
        });
      }
      // catch callback
      try {
        try {
          console.log("handling redirect");
          await auth0.handleRedirectCallback();
        } catch (error) {
          console.log(error);
          // throw new Error("error handling callback");
        }
        const user = await auth0?.getUser();
        setUser(user);
        if (!user) {
          throw new Error("user could not be verified");
        }
        //searchParams.delete("code");
        //searchParams.delete("state");
        //setSearchParams(searchParams);
        const token = await auth0.getTokenSilently();
        console.log(token);
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

            const data = new URLSearchParams();
            data.append("continueToken", response.token);
            data.append("state", config.state);

            fetch(newAction, {
              method: "post",
              body: data.toString(),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
              .then((response) => {
                const location = response.headers.get("location");
                if (location) {
                  window.location.href = location;
                }
              })
              .finally(() => {
                branding.reset();
              });

            //returnToAuth0(newAction, response.token, config.state);
          });
      } catch (error) {
        navigate({
          pathname: "/error",
          search: `?status=401&message=${error}`,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <form method="post" id="returnToAuth0" ref={formRef}>
              <input type="hidden" name="continueToken"></input>
              <input type="hidden" name="state"></input>
            </form>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};
