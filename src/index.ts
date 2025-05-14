import { Hono } from "hono";

const app = new Hono();

const authMiddleware = async (c: any, next: any) => {
  if (c.req.header("Authorization")) {
    console.log("The user is authenticated");
    await next();
  } else {
    return c.text("You don't have access to this part yet");
  }
};

app.get("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

export default app;
