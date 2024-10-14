import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";
import { makeFetchGasCylinderService } from "../../../service/factories/make-fetch-gas-cylinder-service";

export interface QueryParams {
  page?: string;
  pageSize?: string;
}

export async function findAllGasCylinderClients(
  request: FastifyRequest,
  response: FastifyReply
) {
  const { page, pageSize } = request.query as QueryParams;

  const userId = request.user.userId;

  const getUserService = makeGetUserService();

  const user = await getUserService.execute({ userId });

  if (!user) return response.code(404).send({ message: "User not found" });

  if (!user.client)
    return response.code(404).send({ message: "Client not found for user" });

  const clientId = user.client.id;

  const fetchGasCylinderService = makeFetchGasCylinderService();

  try {
    const gasCylinders = await fetchGasCylinderService.execute({
      clientId,
      page: parseInt(page as any),
      pageSize: parseInt(pageSize as any),
    });
    response.status(200).send(gasCylinders);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}
