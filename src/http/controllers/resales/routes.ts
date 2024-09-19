import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { update } from "./update-controller";

export async function resalesRoutes(app: FastifyInstance) {
  app.post("/resales", register);
  app.put("/resales/:id", update);
}
