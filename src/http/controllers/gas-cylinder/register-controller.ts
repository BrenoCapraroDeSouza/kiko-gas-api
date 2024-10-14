import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterGasCylinderService } from "../../../service/factories/make-register-gas-cylinder-service";
import { z } from "zod";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}

export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
  });

  const userId = request.user?.userId;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const data = registerBodySchema.safeParse(request.body);

  if (!data.success) {
    return response.status(400).send({ message: "Dados inválidos" });
  }

  const { name, description, price } = data.data;

  const registerDeviceService = makeRegisterGasCylinderService();

  try {
    const device = await registerDeviceService.execute({
      name,
      description,
      price,
      userId,
    });

    response.status(201).send(device);
  } catch (error: any) {
    console.error("Erro ao registrar Resale:", error);

    if (error.message === "Email já está em uso") {
      response.status(400).send({ message: error.message });
    } else if (error.message === "Resale não encontrado") {
      response.status(404).send({ message: error.message });
    } else {
      response.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
