import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateGasCylinderService } from "../../../service/factories/make-update-gas-cylinder-service";

export async function updateGasCylinder(
    request: FastifyRequest, 
    response: FastifyReply
) {
    const updateGasCylinderParamsSchema = z.object({
        id: z.string(),
    });

    const updateGasCylinderBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        weight: z.number().optional(),
    });

    const userId = request.user?.userId;

    if(!userId) {
        throw new Error("Usuário não autenticado");
    }

    const cylinderId = updateGasCylinderParamsSchema.safeParse(request.params);
    
    if (!cylinderId.success) {
        throw new Error("Invalid parameters");
    }
    
    const data = updateGasCylinderBodySchema.safeParse(request.body);

    if(!data.success) {
        return response.status(400).send({ message: "Dados inválidos" });
    }

    const { ...cylinderData } = data.data;

    const updateDeviceService = makeUpdateGasCylinderService();

    try {
        const cylinder = await updateDeviceService.execute({
            id: cylinderId.data.id,
            userId,
            ...cylinderData,
        });

        response.status(200).send(cylinder);
    } catch (error: any) {
        console.error("Erro ao atualizar cilindro de gás: ", error);
    }
}   