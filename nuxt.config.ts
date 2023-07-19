const handler = "~/server/handler.ts";
const routes = [
  "/interaction",
  "/auth",
  "/backchannel",
  "/device",
  "/device/auth",
  "/session/end",
  "/token/introspection",
  "/jwks",
  "/request",
  "/reg",
  "/token/revocation",
  "/token",
  "/me",
];

export default defineNuxtConfig({
  serverHandlers: [
    ...routes.map((route) => ({ route: route, handler })),
    ...routes.map((route) => ({ route: `${route}/**`, handler })),
  ],
  nitro: {
    preset: "aws-lambda",
  },
});
