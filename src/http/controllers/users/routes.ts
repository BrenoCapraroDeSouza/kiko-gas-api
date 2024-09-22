import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate-controller";

export async function usersRoute(app: FastifyInstance) {
  app.post("/login", authenticate);
}
