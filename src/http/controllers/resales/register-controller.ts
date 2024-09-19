import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaResaleRepository } from "../../../respositories/prisma/prisma-resale-repository";
import { z } from "zod";
import { RegisterService } from "../../../service/resale/register-service";

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

  const registerService = new RegisterService(new PrismaResaleRepository());

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
