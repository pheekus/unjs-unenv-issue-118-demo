import Provider from "oidc-provider";

const demoClient = {
  redirect_uris: ["https://oidcdebugger.com/debug"],
  client_secret: "bar",
  client_id: "foo",
};

const provider = new Provider("http://localhost:3000", {
  findAccount: (_, sub) => ({ accountId: sub, claims: () => ({ sub }) }),
  renderError: (ctx, _, err) => {
    console.error(err);
    ctx.status = 500;
    ctx.body = `Error: ${err.message}`;
  },
  clients: [demoClient],
  pkce: { required: () => false },
});

export default defineEventHandler(async ({ node: { req, res } }) => {
  await provider.app.callback()(req, res);
});
