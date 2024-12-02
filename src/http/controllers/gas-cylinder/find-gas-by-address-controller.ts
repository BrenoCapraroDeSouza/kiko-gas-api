import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";
import { makeFetchClientGasByAddressService } from "../../../service/factories/make-fetch-client-gas-by-address-id";

export async function findGasByAddressId(request: FastifyRequest, response: FastifyReply) {

  const userId = request.user.userId;

  const getUserService = makeGetUserService();

  const user = await getUserService.execute({ userId });

  if (!user) return response.code(404).send({ message: "User not found" });

  const fetchClientGasByAddressService = makeFetchClientGasByAddressService();
  
  try {
    const gasCylinders = await fetchClientGasByAddressService.execute({
      addressId: request.params.id,
      clientId: user.client.id,
    });
    response.status(200).send(gasCylinders);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}