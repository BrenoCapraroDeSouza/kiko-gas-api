import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";

export async function refresh(request: FastifyRequest, response: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  });

  const userParams = request.user as any;

  const { type, userId } = userParams;

  const userService = makeGetUserService();

  const user = (await userService.execute({ userId })) as any;

  const token = await response.jwtSign(
    { type },
    {
      sign: {
        sub: userId,
      },
    }
  );

  const refreshToken = await response.jwtSign(
    { type, userId },
    {
      sign: {
        sub: userId,
        expiresIn: "7d",
      },
    }
  );

  return response
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
    })
    .status(200)
    .send({
      name: user?.resale?.name || user?.client?.name,
      token,
    });
}
