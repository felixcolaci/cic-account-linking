import { Handler } from "@netlify/functions";
import { jwtVerify, SignJWT } from "jose";

const { TOKEN_SIGNING } = process.env;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

const handleCors = (event) => {
  if (event.httpMethod == "OPTIONS") {
    // To enable CORS
    return {
      statusCode: 200, // <-- Important!
      headers: corsHeaders,
      body: "Options Callback",
    };
  }
};

const handleError = (message: string, status = 400) => {
  return {
    statusCode: status,
    body: JSON.stringify({
      message,
      status,
    }),
    headers: {
      "content-type": "application/json",
      ...corsHeaders,
    },
  };
};

export const handler: Handler = async (event, context) => {
  const corsResponse = handleCors(event);
  if (corsResponse) {
    return corsResponse;
  }

  // @ts-ignore
  const { state, link_with, sessionToken, provider, user_id, action } = JSON.parse(event.body);
  if (!state || !sessionToken) {
    return handleError("provide state, link_with and sessionToken!");
  }

  try {
    const { payload } = await jwtVerify(sessionToken, Buffer.from(TOKEN_SIGNING || ""), {
      algorithms: ["HS256"],
    });

    const token = await new SignJWT({
      state,
      link_with,
      provider,
      user_id,
      action,
    })
      .setSubject(payload.sub || "")
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setIssuer("https://cic-account-linking.netflify.app")
      .setExpirationTime("60s")
      .sign(Buffer.from(TOKEN_SIGNING || ""));

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
      headers: {
        "content-type": "application/json",
        ...corsHeaders,
      },
    };
  } catch (error) {
    return handleError("the provided token is invalid", 401);
  }
};
