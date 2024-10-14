import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";
import { makeRegisterDeviceService } from "../../../service/factories/make-register-device-service";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}

export async function registerDevice(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      price: z.number().optional(),
    })
    .strict();

  const userId = request.user?.userId;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const { name, description, price } = registerBodySchema.parse(request.body);

  console.log(request.body);

  const registerDeviceService = makeRegisterDeviceService();

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
