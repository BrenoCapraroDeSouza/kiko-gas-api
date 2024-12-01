import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";
import { makeFetchClientGasCylinderService } from "../../../service/factories/make-fetch-client-gas-cylinder-service";

export interface QueryParams {
  page?: string;
  pageSize?: string;
  orderBy?: "asc" | "desc";
}

export async function findAllClientGasById(
  request: FastifyRequest,
  response: FastifyReply
) {
  const { page, pageSize, orderBy } = request.query as QueryParams;

  const clientId = request.params.id;

  const fetchGasCylinderService = makeFetchClientGasCylinderService();

  try {
    const gasCylinders = await fetchGasCylinderService.execute({
      clientId,
      page: parseInt(page as any),
      pageSize: parseInt(pageSize as any),
      orderBy,
    });
    
    response.status(200).send(gasCylinders);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}
