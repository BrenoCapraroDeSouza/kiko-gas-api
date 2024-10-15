import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterResaleService } from "../../../service/factories";


export async function register(
  request: FastifyRequest,
  response: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    cnpj: z.string(),
    email: z.string().email(),
    password: z.string(),
    address: z.object({
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      publicPlace: z.string(),
      number: z.string(),
      ie: z.string().optional(),
    }),
  });
  
  const { name, address, cnpj, email, password, phone } =
    registerBodySchema.parse(request.body);

  const registerResaleService = makeRegisterResaleService();

  try {
    const resale = await registerResaleService.execute({
      name,
      phone,
      cnpj,
      email,
      password,
      address: {
        ...address,
        ie: address.ie ?? "",
      },
    });

    response.status(201).send(resale);
  } catch (error: any) {
    console.error("Erro ao registrar Resale:", error);

    if (error.message === "Email já está em uso") {
      response.status(400).send({ message: error.message });
    } else if (error.message === "Resale não encontrado") {
      response.status(404).send({ message: error.message });
    } else {
      response.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
