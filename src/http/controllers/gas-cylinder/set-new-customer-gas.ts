import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSetNewCustomerGasCylinderService } from "../../../service/factories/make-set-new-customer-gas-cylinder-service";

export async function setNewCustomerGasCylinder(
  request: FastifyRequest, 
  response: FastifyReply
) {
  
  const createGasCylinderParamsSchema = z.object({
    id: z.string(),
  });

  const createGasCylinderBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    addressId: z.string(),
    price: z.number(),
  });

  const userId = request.user?.userId;

  if(!userId) {
    throw new Error("Usuário não autenticado");
  }

  const clientId = createGasCylinderParamsSchema.safeParse(request.params);

  if (!clientId.success) {
    throw new Error("Invalid parameters");
  }

  const data = createGasCylinderBodySchema.safeParse(request.body);

  if(!data.success) {
      return response.status(400).send({ message: "Dados inválidos" });
  }

  const { ...cylinderData } = data.data;

  const SetNewCustomerGasCylinderService = makeSetNewCustomerGasCylinderService();

  try {
    const cylinder = await SetNewCustomerGasCylinderService.execute({
      clientId: clientId.data.id,
      ...cylinderData,
    });

    response.status(200).send(cylinder);
  } catch (error) {
    console.error("Erro ao atribuir cilindro de gás: ", error);
  }

}