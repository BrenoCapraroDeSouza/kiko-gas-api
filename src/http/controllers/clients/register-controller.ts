import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterService } from "../../../service/client/factories/make-register-service";

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    cpfcnpj: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, cpfcnpj, email, password, phone } = registerBodySchema.parse(
    request.body
  );

  const registerService = makeRegisterService();

  try {
    const { client } = await registerService.execute({
      name,
      phone,
      cpfcnpj,
      email,
      password,
      resaleId: (request.user as any).userId,
    });

    response.status(201).send(client);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
}
