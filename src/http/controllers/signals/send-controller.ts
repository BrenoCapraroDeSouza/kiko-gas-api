import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSendSignalService } from "../../../service/factories/make-send-signal-service";

export async function send(request: FastifyRequest, response: FastifyReply) {
  const SignalTypeEnum = z.enum(["COLLECTION", "REPLENISHMENT", "REQUEST"]);
  const PaymentTypeEnum = z.enum(["PIX", "MONEY"]).nullable();

  const CylinderRequestSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional().default(""),
    price: z.number().min(0, "O preço deve ser maior ou igual a zero"),
    paymentType: PaymentTypeEnum.nullable().optional().default(null),
    exchange: z.number().nullable().optional().default(null),
  });

  const ClientRequestSchema = z.object({
    id: z.string().optional().default(""),
    name: z.string().min(1),
    phone: z.string().min(1),
    cpfcnpj: z.string().min(11, "CPF/CNPJ inválido"),
    address: z.string().min(1, "Endereço do cliente é obrigatório"),
    cylinder: CylinderRequestSchema,
  });

  const registerSignalRequestSchema = z.object({
    type: SignalTypeEnum,
    client: ClientRequestSchema,
  });

  const data = registerSignalRequestSchema.safeParse(request.body);

  if (!data.success) {
    return response.status(400).send({ message: "Dados inválidos" });
  }

  const { client, type } = data.data;

  const sendSignalService = makeSendSignalService();

  try {
    const userId = (request.user as any)?.userId;
    client.id = userId;

    const signal = await sendSignalService.execute({
      type,
      client,
    });

    response.status(201).send(client);
  } catch (error: any) {
    console.error("Erro ao emitir um sinal:", error);

    if (error.message === "Email já está em uso") {
      response.status(400).send({ message: error.message });
    } else if (error.message === "Resale não encontrado") {
      response.status(404).send({ message: error.message });
    } else {
      response.status(500).send({
        message: `Erro interno do servidor: ${error?.message ?? error?.meta?.message}`,
      });
    }
  }
}
