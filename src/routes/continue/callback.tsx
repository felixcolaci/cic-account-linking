import { Loading } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router";

import { Auth0Client, User } from "@auth0/auth0-spa-js";
import { useEffect, useRef, useState } from "react";

interface LocalState {
  clientId: string;
  domain: string;
  loginHint: string;
  provider: string;
  connection: string;
  action: "dismiss" | "link";
}

interface SubmitParams {
  action: string;
  state: string;
  continueToken: string;
}

const ContinueForm = (props: SubmitParams) => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    console.log(props);
    if (formRef.current && props.action && props.continueToken && props.state) {
      formRef.current?.submit();
    }
  }, [props]);
  return (
    <form method="post" id="returnToAuth0" action={props.action} ref={formRef}>
      <input type="hidden" name="continueToken" value={props.continueToken}></input>
      <input type="hidden" name="state" value={props.state}></input>
    </form>
  );
};

export const CallbackePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [userToken, setUserToken] = useState("");
  const [continueParams, setContinueParms] = useState<SubmitParams | undefined>();

  const [isRedirecting] = useState(false);

  if (state) {
    localStorage.setItem("state", JSON.stringify(state));
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

    let getUser = async () => {
      const auth0 = getAuth0Client();

      if (!auth0) {
        navigate({
          pathname: "/error",
          search: `?status=401&message=${"auth0 client was undefined"}`,
        });
      }

      try {
        console.log("handling redirect");
        await auth0.handleRedirectCallback();
        const user = await auth0?.getUser();
        console.log(user);
        setUser(user);
        const token = await auth0.getTokenSilently();
        console.log(token);
        setUserToken(token);
        if (!user) {
          throw new Error("user could not be verified");
        }
      } catch (error) {
        console.log(error);
        // throw new Error("error handling callback");
      }
    }
    
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    let processAuth = async () => {
      
      // catch callback
      try {
        //searchParams.delete("code");
        //searchParams.delete("state");
        //setSearchParams(searchParams);
        
        const config = JSON.parse(localStorage.getItem("config") || "{}");
        const state = JSON.parse(localStorage.getItem("state") || "{}");
        return fetch("https://cic-account-linking.netlify.app/.netlify/functions/sign-data", {
          method: "POST",
          body: JSON.stringify({
            link_with: userToken,
            sessionToken: config.sessionToken,
            state: config.state,
            provider: state.provider,
            action: state.action,
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

            setContinueParms({
              action: newAction,
              state: config.state,
              continueToken: response.token,
            });

            //returnToAuth0(newAction, response.token, config.state);
          });
      } catch (error) {
        navigate({
          pathname: "/error",
          search: `?status=401&message=${error}`,
        });
      }
    };

    if(user && userToken){
      processAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userToken]);

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
          ></Card.Footer>
        </Card>
      )}
      {continueParams !== undefined ? (
        <ContinueForm
          action={continueParams.action}
          state={continueParams.state}
          continueToken={continueParams.continueToken}
        />
      ) : (
        ""
      )}
    </>
  );
};
