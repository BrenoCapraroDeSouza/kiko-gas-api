import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";
import { register } from "./register-controller";
import { findAll } from "./fetch-controller";
import { findAllGasCylinderClients } from "./fetch-clients-controller";

export async function gasCylinderRoutes(app: FastifyInstance) {
  app.post(
    "/gas",
    { onRequest: [verifyJWT, verifyUserType("RESALE")] },
    register
  );

  app.get(
    "/gas",
    { onRequest: [verifyJWT, verifyUserType("RESALE")] },
    findAll
  );

  app.get("/gas/client", { onRequest: [verifyJWT] }, findAllGasCylinderClients);
}
