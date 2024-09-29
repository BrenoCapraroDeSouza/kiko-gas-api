import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchClientService } from "../../../service/factories";

export async function findAll(
    request: FastifyRequest, response: FastifyReply
) {

    const { page = 1, pageSize = 10 } = request.query as any;

    const fetchClientService = makeFetchClientService();

    try {
        const clients = await fetchClientService.execute({ page, pageSize });
        response.status(200).send(clients);
    } catch (error) {
        response.code(500).send({ message: error.message });
    }
}