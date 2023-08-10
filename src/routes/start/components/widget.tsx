import { TableBody, TableHeader } from "@react-stately/table";
import { Identity, LinkingRequest } from "../../../misc/linking-request";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableCell,
  TableColumn,
  TableRow,
} from "@nextui-org/react";
import { useNavigate } from "react-router";

const IdentityList = (props: { identities: Identity[]; navigate: (connection: string, provider: string) => void }) => {
  return (
    <>
      <h3 className="text-bold">Accounts found for linking</h3>
      <Table hideHeader>
        <TableHeader>
          <TableColumn>Identity Provider</TableColumn>
          <TableColumn>User ID</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {props.identities.map((identity) => {
            return (
              <TableRow key={identity.user_id}>
                <TableCell>{identity.provider}</TableCell>
                <TableCell>{identity.user_id}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={() => props.navigate(identity.connection, identity.provider)}
                  >
                    Link Account
                  </Button>
                </TableCell>
              </TableRow>
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
      <Table hideHeader>
        <TableHeader>
          <TableColumn>Identity Provider</TableColumn>
          <TableColumn>User ID</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key={props.identity.user_id}>
            <TableCell>{props.identity.provider}</TableCell>
            <TableCell>{props.identity.user_id}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export const Widget = (props: LinkingRequest) => {
  const navigate = useNavigate();

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
      shadow="sm"
      style={{
        maxWidth: "500px",
        padding: "1em",
      }}
    >
      <CardHeader
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 className="text-bold text-large">Link your Accounts</h1>
      </CardHeader>
      <CardBody>
        <p>
          Hey, {props.username || props.email}! We have found other accounts with your email address{" "}
          {props.username ? <>({props.email})</> : ""}. Would you like to link it?
        </p>
        {props.identities.length > 1 ? (
          <IdentityList identities={props.identities} navigate={navigateToContinue}></IdentityList>
        ) : (
          <OneIdentity identity={props.identities[0]}></OneIdentity>
        )}
      </CardBody>
      <CardFooter
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
              variant="solid"
              onClick={() => navigateToContinue(props.identities[0].connection, props.identities[0].provider)}
            >
              Link Account
            </Button>
          ) : (
            ""
          )}

          <Button color="primary" variant="light" onClick={dismiss}>
            Dismiss
          </Button>
        </>
      </CardFooter>
    </Card>
  );
};
