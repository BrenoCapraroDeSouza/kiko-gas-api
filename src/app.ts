import fastify from "fastify";
import { resalesRoutes } from "./http/controllers/resales/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { usersRoute } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

// Routes
app.register(resalesRoutes);
app.register(usersRoute);
