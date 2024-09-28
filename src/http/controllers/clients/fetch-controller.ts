import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClientsRepository } from "../../../respositories/prisma/prisma-clients-repository";

export async function findAll(
    request: FastifyRequest, response: FastifyReply
) {

    const { page = 1, pageSize = 10 } = request.query as any;

    const clientsRepository = new PrismaClientsRepository();

    try {
        const clients = await clientsRepository.findAll(Number(page), Number(pageSize));
        response.status(200).send(clients);
    } catch (error) {
        response.code(500).send({ message: error.message });
    }
}