import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSetGasCylindersService } from "../../../service/factories/make-set-gas-cylinders-address-service";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}

export async function setCylinderAddress(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    addressId: z.string(),
    cylinderId: z.string(),
  });

  const userId = request.user?.userId;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const data = registerBodySchema.safeParse(request.body);

  if (!data.success) {
    return response.status(400).send({ message: "Dados inválidos" });
  }

  const { addressId, cylinderId } = data.data;
  const clientId = request.params.id;

  const setGasCylindersService = makeSetGasCylindersService();

  try {
    const gasCylinder = await setGasCylindersService.execute({
      addressId,
      cylinderId,
      clientId,
    });

    response.status(201).send(gasCylinder);
  } catch (error: any) {
    console.error("Erro ao adicionar endereço ao cilindro:", error);

    response
      .status(500)
      .send({ message: "Erro ao adicionar endereço ao cilindro" });
  }
}
