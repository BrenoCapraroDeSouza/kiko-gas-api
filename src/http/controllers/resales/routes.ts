import { FastifyInstance } from "fastify";
import { register } from "./register-controller";
import { findAll } from "./fetch-controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";

export async function resalesRoutes(app: FastifyInstance) {
  app.post("/resales", register);
  app.get("/resales", findAll);
}
