import { FastifyInstance } from "fastify";
import { register } from "./register-controller";

export async function clientsRoutes(app: FastifyInstance) {
  app.post("/clients", register);
}
