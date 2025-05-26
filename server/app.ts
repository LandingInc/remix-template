import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import testRouter from "./routes/test";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

app.get("/health", (_req, res) => {
  res.json({ message: "OK" });
});

app.use("/api/test", testRouter);

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  }),
);
