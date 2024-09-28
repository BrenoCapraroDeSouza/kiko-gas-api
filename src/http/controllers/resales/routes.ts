import { FastifyInstance } from "fastify";
import { register } from "./register-controller";

export async function resalesRoutes(app: FastifyInstance) {
  app.post("/resales", register);
}
