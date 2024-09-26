import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";

export async function clientsRoutes(app: FastifyInstance) {
  app.post(
    "/clients",
    { onRequest: [verifyJWT, verifyUserType("RESALE")] },
    register
  );
}
