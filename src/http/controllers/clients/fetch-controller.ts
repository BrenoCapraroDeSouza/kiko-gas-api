import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchClientService } from "../../../service/factories";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserType } from "../../middlewares/verify-user-type";
import { makeGetUserService } from "../../../service/factories/make-get-user-service";

export async function findAll(
    request: FastifyRequest, response: FastifyReply
) {

    const { page = 1, pageSize = 10 } = request.query as any;

    const userId = request.user.userId;

    const getUserService =  makeGetUserService();

    const user = await getUserService.execute({ userId });

    if (!user) return response.code(404).send({ message: "User not found" });

    if (!user.resale) return response.code(404).send({ message: "Resale not found for user" });
    
    const resaleId = user.resale.id;

    const fetchClientService = makeFetchClientService();

    try {
        const clients = await fetchClientService.execute({ resaleId, page, pageSize });
        response.status(200).send(clients);
    } catch (error) {
        response.code(500).send({ message: error.message });
    }
}