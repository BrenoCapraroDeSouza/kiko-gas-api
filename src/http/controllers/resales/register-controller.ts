import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterService } from "../../../service/resale/factories/make-register-service";

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
    address: z.object({
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      publicPlace: z.string(),
      number: z.string(),
      ie: z.string().optional(),
    }),
  });

  const { name, address, cpfcnpj, email, password, phone } =
    registerBodySchema.parse(request.body);

  const registerService = makeRegisterService();

  try {
    const { resale } = await registerService.execute({
      name,
      phone,
      cpfcnpj,
      email,
      password,
      address,
    });

    response.status(201).send(resale);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
}
