import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterClientAddressService } from "../../../service/factories/make-register-client-address-service";


export async function registerAddress(
    request: FastifyRequest,
    response: FastifyReply
){
    const registerBodySchema = z.object({
        name: z.string(),
        address: z.string(),
    })
    .strict();

    const userId = request.user?.userId;

    if (!userId) {
        throw new Error("Usuário não autenticado");
    }

    const addressData = registerBodySchema.parse(request.body);

    const registerClientAddressService = makeRegisterClientAddressService();

    try {
        const updatedClient = await registerClientAddressService.execute({
            clientId: userId,
            addressData,
        });
        
        response.status(201).send(updatedClient);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
}
