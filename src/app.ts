import fastify from "fastify";
import { resalesRoutes } from "./http/controllers/resales/routes";

export const app = fastify();

app.register(resalesRoutes);
