import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchClientService } from "../../../service/factories";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";
import { parse } from "path";

export interface QueryParams {
  page?: string;
  pageSize?: string;
  orderBy?: "asc" | "desc";
}

export async function findAll(request: FastifyRequest, response: FastifyReply) {
  const { page, pageSize , orderBy } = request.query as QueryParams;

  const userId = request.user.userId;

  const getUserService = makeGetUserService();

  const user = await getUserService.execute({ userId });

  if (!user) return response.code(404).send({ message: "User not found" });

  if (!user.resale) return response.code(404).send({ message: "Resale not found for user" });

  const resaleId = user.resale.id;

  const fetchClientService = makeFetchClientService();

  try {
    const clients = await fetchClientService.execute({
      resaleId,
      page: parseInt(page as any),
      pageSize: parseInt(pageSize as any),
      orderBy,
    });
    response.status(200).send(clients);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}
