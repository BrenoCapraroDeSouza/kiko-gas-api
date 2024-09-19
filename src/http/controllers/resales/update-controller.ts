import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaResaleRepository } from "../../../respositories/prisma/prisma-resale-repository";
import { z } from "zod";
import { UpdateService } from "../../../service/resale/update-service";
import { makeUpdateService } from "../../../service/resale/factories/make-update-service";

export async function update(
    request: FastifyRequest,
    response: FastifyReply
) {
    const updateParamsSchema = z.object({
        id: z.string(),
    });

    const updateBodySchema = z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        cpfcnpj: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        address: z.object({
            state: z.string().optional(),
            city: z.string().optional(),
            neighborhood: z.string().optional(),
            publicPlace: z.string().optional(),
            number: z.string().optional(),
            ie: z.string().optional(),
        }).optional(),
    });

    const { id } = updateParamsSchema.parse(request.params);

    const { name, phone, cpfcnpj, email, password, address } = updateBodySchema.parse(request.body);

    const updateService = makeUpdateService();

    try {
        const { resale } = await updateService.execute({
            id,
            name,
            phone,
            cpfcnpj,
            email,
            password,
            address,
        });

        response.status(201).send(resale);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal server error" });
    }
}