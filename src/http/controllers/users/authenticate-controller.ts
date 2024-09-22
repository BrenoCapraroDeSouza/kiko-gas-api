import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateService } from "../../../service/users/factories/make-authenticate-service";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = registerBodySchema.parse(request.body);

  const authenticateService = makeAuthenticateService();

  try {
    const { user } = await authenticateService.execute({
      email,
      password,
    });

    const token = await response.jwtSign(
      {
        type: user.userType,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await response.jwtSign(
      {
        type: user.userType,
      },
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
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
}
