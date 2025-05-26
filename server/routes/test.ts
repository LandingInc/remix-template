import { Router } from "express";

const testRouter = Router();

testRouter.get("/", (req, res) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  res.json({ message: "TEST API" });
});

export default testRouter;
