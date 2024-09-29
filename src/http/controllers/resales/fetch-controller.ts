import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchResaleService } from "../../../service/factories";

export async function findAll(
    request: FastifyRequest, response: FastifyReply
) {

    const { page = 1, pageSize = 10 } = request.query as any;

    const fetchResaleService = makeFetchResaleService();

    try {
        const resales = await fetchResaleService.execute({ page, pageSize });
        response.status(200).send(resales);
    } catch (error) {
        response.code(500).send({ message: error.message });
    }
}