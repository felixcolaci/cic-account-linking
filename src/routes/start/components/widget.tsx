import { TableBody, TableHeader } from "@react-stately/table";
import { Identity, LinkingRequest } from "../../../misc/linking-request";
import { Button, Card, Table } from "@nextui-org/react";
import { useNavigate } from "react-router";
import { useBrandingStore } from "../../../misc/branding.store";
import { buttonRadius, colors, colorsLight } from "../../../misc/style-processor";

const IdentityList = (props: { identities: Identity[]; navigate: (connection: string, provider: string) => void }) => {
  return (
    <>
      <h3 className="text-bold">Accounts found for linking</h3>
      <Table
        shadow={false}
        css={{
          paddingLeft: 0,
        }}
      >
        <TableHeader>
          <Table.Column>Identity</Table.Column>
          <Table.Column>User ID</Table.Column>
          <Table.Column>Action</Table.Column>
        </TableHeader>
        <TableBody>
          {props.identities.map((identity) => {
            return (
              <Table.Row key={identity.user_id}>
                <Table.Cell>{identity.provider}</Table.Cell>
                <Table.Cell>{identity.user_id}</Table.Cell>
                <Table.Cell>
                  <Button color="primary" onClick={() => props.navigate(identity.connection, identity.provider)}>
                    Link Account
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

const OneIdentity = (props: { identity: Identity }) => {
  return (
    <div
      style={{
        marginTop: "2em",
      }}
    >
      <h3
        className="text-bold"
        style={{
          marginBottom: "1em",
        }}
      >
        Account found for linking
      </h3>
      <Table
        shadow={false}
        css={{
          paddingLeft: 0,
        }}
      >
        <TableHeader>
          <Table.Column>Identity</Table.Column>
          <Table.Column>User ID</Table.Column>
        </TableHeader>
        <TableBody>
          <Table.Row key={props.identity.user_id}>
            <Table.Cell>{props.identity.provider}</Table.Cell>
            <Table.Cell>{props.identity.user_id}</Table.Cell>
          </Table.Row>
        </TableBody>
      </Table>
    </div>
  );
};

export const Widget = (props: LinkingRequest) => {
  const navigate = useNavigate();

  const branding = useBrandingStore();

  const DEFAULT_TITLE = "Link your Accounts";

  const navigateToContinue = (connection: string, provider: string) => {
    navigate("/continue", {
      state: {
        action: "link",
        loginHint: props.email,
        connection,
        provider,
        ...props.ui_client,
      },
    });
  };
  const dismiss = () => {
    navigate("/continue/dismiss", {
      state: {
        action: "dismiss",
      },
    });
  };

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
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "1em", fontWeight: "bold" }}>Hey, {props.username || props.email}!</p>

          {props.identities.length > 1 ? (
            <p>
              {" "}
              It seems like you already have accounts with us using the same email address{" "}
              {props.username ? <>({props.email})</> : ""}. Would you like to add your this new login to your existing
              account?
            </p>
          ) : (
            <p>
              {" "}
              It seems like you already have an account with us using the same email address{" "}
              {props.username ? <>({props.email})</> : ""}. Would you like to add your this new login to your existing
              account?
            </p>
          )}
        </div>
        {props.identities.length > 1 ? (
          <IdentityList identities={props.identities} navigate={navigateToContinue}></IdentityList>
        ) : (
          <OneIdentity identity={props.identities[0]}></OneIdentity>
        )}
      </Card.Body>
      <Card.Footer
        style={{
          display: "flex",
          flexDirection: "column",

          gap: "1em",
        }}
      >
        <>
          {props.identities.length === 1 ? (
            <Button
              color="primary"
              css={{ ...buttonRadius(branding), ...colors(branding) }}
              onClick={() => navigateToContinue(props.identities[0].connection, props.identities[0].provider)}
            >
              Update existing account
            </Button>
          ) : (
            ""
          )}

          <Button color="primary" light onClick={dismiss} css={{ ...colorsLight(branding) }}>
            Create seperate account
          </Button>
        </>
      </Card.Footer>
    </Card>
  );
};
