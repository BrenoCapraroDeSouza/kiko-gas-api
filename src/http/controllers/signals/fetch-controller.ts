import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchClientAddressesService } from "../../../service/factories/make-fetch-client-addresses-service";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";
import { makeFetchSignalService } from "../../../service/factories/make-fetch-signal-service";

export interface QueryParams {
  page?: string;
  pageSize?: string;
  orderBy?: "asc" | "desc";
}

export async function fetch(request: FastifyRequest, response: FastifyReply) {
  const userId = request.user.userId;

  const getUserService = makeGetUserService();

  const user = await getUserService.execute({ userId });

  if (!user) {
    return response.code(404).send({ message: "User not found" });
  }

  console.log(user);
  const resaleId = user.resale.id;

  const fetchSignalService = makeFetchSignalService();

  try {
    const signals = await fetchSignalService.execute({ resaleId });
    response.status(200).send(signals);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}
