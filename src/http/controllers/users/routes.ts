import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate-controller";
import { refresh } from "./refresh-controller";

export async function usersRoute(app: FastifyInstance) {
  app.post("/login", authenticate);
  app.post("/refresh", refresh);
}
