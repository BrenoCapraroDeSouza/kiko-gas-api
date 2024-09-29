import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import { resalesRoutes } from "./http/controllers/resales/routes";
import { clientsRoutes } from "./http/controllers/clients/routes";
import { usersRoute } from "./http/controllers/users/routes";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  credentials: true,
});

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

app.register(fastifyCookie, {
  parseOptions: {
    sameSite: "none",
    secure: true,
  },
});

// Routes
app.register(resalesRoutes);
app.register(clientsRoutes);
app.register(usersRoute);
