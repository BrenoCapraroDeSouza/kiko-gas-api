import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";

export async function refresh(request: FastifyRequest, response: FastifyReply) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response
      .status(401)
      .send({ error: "No Authorization header provided" });
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return response
      .status(401)
      .send({ error: "Invalid Authorization header format" });
  }

  try {
    const userParams = request.server.jwt.verify(token);

    const { type, userId } = userParams as any;

    const userService = makeGetUserService();

    const user = (await userService.execute({ userId })) as any;

    const newToken = await response.jwtSign(
      { type, userId },
      {
        sign: {
          userId: user.id,
          sub: userId,
        },
      }
    );

    // Gera um novo refresh token
    const newRefreshToken = await response.jwtSign(
      { type, userId },
      {
        sign: {
          sub: userId,
          expiresIn: "7d",
        },
      }
    );

    return response
      .setCookie("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .status(200)
      .send({
        name: user?.resale?.name || user?.client?.name,
        token: newToken, // Retorna o novo token
      });
  } catch (error) {
    console.error(error);
    return response.status(401).send({ error: "Invalid or expired token" });
  }
}
