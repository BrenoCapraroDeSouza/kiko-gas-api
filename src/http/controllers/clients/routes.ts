import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";
import { findAll } from "./fetch-controller";

export async function clientsRoutes(app: FastifyInstance) {
  app.post(
    "/clients",
    { onRequest: [verifyJWT, verifyUserType("RESALE")] },
    register
  );
  app.get("/clients", 
    { onRequest: [verifyJWT, verifyUserType("RESALE")] },
    findAll);
}
