import { Prisma, Client } from "@prisma/client";
import { ClientRepository } from "../client-repository";
import { prisma } from "../../lib/prisma";

export class PrismaClientRepository implements ClientRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return prisma.client.create({ data });
  }

  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.ClientUpdateInput
  ): Promise<Client | null> {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  async findAll(
    resaleId: string,
    page: number = 1, 
    pageSize: number = 10
  ): Promise<Client[]> {
    const skip = (page - 1) * pageSize;
    return await prisma.client.findMany({
      where: { resaleId: resaleId },
      skip,
      take: pageSize,
    });
  }
}
