# Issue 118 @ unjs/unenv

This project shows the issue described at <https://github.com/unjs/unenv/issues/118>.

## Setup

Install dependencies and that's it: `npm install`.

## Expected behavior

In dev mode (`npm run dev`) you should be able to log in and obtain an auth code without any issues. Here's an example of a URL you can use:

```text
http://localhost:3000/auth?client_id=foo&redirect_uri=https%3A%2F%2Foidcdebugger.com%2Fdebug&scope=openid&response_type=code&response_mode=form_post&state=pi1wcifwquc&nonce=7nzzdz88kqc
```

I'm assuming that's because the dev version uses Nitro with a different preset and/or uses it in some other way that doesn't involve the `ServerResponse` implementation from `unjs/unenv`.

When built (`npm run build`) and ran in a Lambda-like environment (`npm run test`) that simulates accessing the URL above, `oidc-provider` produces the following error. The same happens when deployed to a real AWS account:

```text
ctx.response.get(...).forEach is not a function
```

Here `ctx` is a Koa context, `ctx.response` is a Koa response. Its `get()` method calls `getHeader()` on a `ServerResponse` instance internally. That instance happens to come from `unjs/unenv` when a Nuxt 3 project is built with the `aws-lambda` preset.

Unlike the real `http.ServerResponse` from Node, unenv's `ServerResponse` converts all header values to `string`. That causes issues for `oidc-provider` because it expects to `.get()` an array after `.set()`-ing one. This particular example is erroring around reading/writing multi-value `set-cookie` header which is a pretty common scenario.
