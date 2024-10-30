import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchClientAddressesService } from "../../../service/factories/make-fetch-client-addresses-service";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";

export async function fetchAddresses(request: FastifyRequest, response: FastifyReply) {

    const userId = request.user.userId;

    const getUserService = makeGetUserService();

    const user = await getUserService.execute({ userId });

    if (!user) {
        return response.code(404).send({ message: "User not found" });
    }
    
    const clientId = user.client.id;
    const fetchClientAddressesService = makeFetchClientAddressesService();

    try {
        const addresses = await fetchClientAddressesService.execute({ clientId });
        response.status(200).send(addresses);
    } catch (error) {
        response.code(500).send({ message: error.message });
    }
}