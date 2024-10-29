import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { send } from "./send-controller";
import { fetch } from "./fetch-controller";

export async function signalsRoutes(app: FastifyInstance) {
  app.post("/signals", { onRequest: [verifyJWT] }, send);
  app.get("/signals", { onRequest: [verifyJWT] }, fetch);
}
