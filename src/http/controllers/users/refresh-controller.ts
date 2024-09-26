import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, response: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  });

  const user = request.user as any;

  const { type, userId } = user;

  const token = await response.jwtSign(
    { type },
    {
      sign: {
        sub: user.id,
      },
    }
  );

  const refreshToken = await response.jwtSign(
    { type, userId },
    {
      sign: {
        sub: user.id,
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
      token,
    });
}
