import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";
import { register } from "./register-controller";
import { findAll } from "./fetch-controller";
import { findAllClientGasById } from "./fetch-clients-controller";
import { updateGasCylinder } from "./update-controller";

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

  app.get(
    "/gas/client/:id", 
    { onRequest: [verifyJWT, verifyUserType("RESALE")] }, 
    findAllClientGasById
  );

  app.patch(
    "/gas/:id", 
    { onRequest: [verifyJWT, verifyUserType("RESALE")] }, 
    updateGasCylinder
  );
}
