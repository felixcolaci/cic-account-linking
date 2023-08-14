import { Branding } from "./branding.store";

export interface LinkingRequest {
  iss: string;
  iat: number;
  sub: string;
  exp: number;
  ip: string;
  email: string;
  username: string;
  identities: Identity[];
  branding?: Branding;
  ui_client: Client;
}

export interface Identity {
  connection: string;
  provider: string;
  user_id: string;
  isSocial: boolean;
}

export interface Client {
  clientId: string;
  domain: string;
}
