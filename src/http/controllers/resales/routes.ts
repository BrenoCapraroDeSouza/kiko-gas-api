import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { findAll } from "./fetch-controller";

export async function resalesRoutes(app: FastifyInstance) {
  app.post("/resales", register);
  app.get("/resales", findAll);
}
