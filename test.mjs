import { handler } from "./.output/server/index.mjs";

const response = await handler(
  {
    multiValueQueryStringParameters: {},
    queryStringParameters: {
      response_type: "code",
      response_mode: "query",
      redirect_uri: "https://oidcdebugger.com/debug",
      client_id: "foo",
      scope: "openid",
      state: "t0k4i2l2kqj",
      nonce: "9wwxw6iqa3 ",
    },
    multiValueHeaders: {},
    isBase64Encoded: false,
    requestContext: {},
    stageVariables: {},
    pathParameters: {},
    httpMethod: "GET",
    resource: "/{proxy+}",
    headers: {
      Cookie: [
        "_interaction=P60gcu_MGxVKecQH4k0D1",
        "_session=w3D4UhWKHSF4ml6HoBlWp",
        "_session.legacy=w3D4UhWKHSF4ml6HoBlWp",
      ].join("; "),
      Host: "1234567890.execute-api.us-east-1.amazonaws.com",
    },
    path: "/auth",
    body: null,
  },
  {}
);

console.log(response);
