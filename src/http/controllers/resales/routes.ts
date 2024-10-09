import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { findAll } from "./fetch-controller";
import { registerDevice } from "./register-device-controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";

export async function resalesRoutes(app: FastifyInstance) {
  app.post("/resales", register);
  app.post(
    "/resales/device",
    { onRequest: [verifyJWT, verifyUserType("RESALE")] },
    registerDevice
  );
  app.get("/resales", findAll);
}
