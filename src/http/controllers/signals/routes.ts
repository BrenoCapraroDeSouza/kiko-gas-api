import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { send } from "./send-controller";

export async function signalsRoutes(app: FastifyInstance) {
  app.post("/signals", { onRequest: [verifyJWT] }, send);
}
