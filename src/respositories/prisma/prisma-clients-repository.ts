import { Client, Prisma, Resale } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ClientsRepository } from "../clients-repository";

export class PrismaClientsRepository implements ClientsRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await prisma.client.create({
      data,
    });

    return client;
  }

  async findById(id: string): Promise<Client | null> {
    return await prisma.client.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ClientUpdateInput
  ): Promise<Client | null> {
    const client = await prisma.client.update({
      where: {
        id,
      },
      data,
    });

    return client;
  }
}
