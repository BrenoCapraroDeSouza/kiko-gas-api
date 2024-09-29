import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterClientService } from "../../../service/factories";


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

  const registerClientService = makeRegisterClientService();

  try {
    const userId = (request.user as any)?.userId;

    const client = await registerClientService.execute({
      name,
      phone,
      cpfcnpj,
      email,
      password,
      userId,
    });

    response.status(201).send(client);
  } catch (error: any) {
    console.error("Erro ao registrar Client:", error);

    if (error.message === "Email já está em uso") {
      response.status(400).send({ message: error.message });
    } else if (error.message === "Resale não encontrado") {
      response.status(404).send({ message: error.message });
    } else {
      response.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
