import { Prisma, Resale } from "@prisma/client";
import { ResaleRepository } from "../resale-repository";
import { prisma } from "../../lib/prisma";

export class PrismaResaleRepository implements ResaleRepository {
  async create(data: Prisma.ResaleCreateInput): Promise<Resale> {
    return prisma.resale.create({ data });
  }

  async findById(id: string): Promise<Resale | null> {
    return prisma.resale.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.ResaleUpdateInput
  ): Promise<Resale | null> {
    return prisma.resale.update({
      where: { id },
      data,
    });
  }

  async findAll(): Promise<Resale[]> {
    return prisma.resale.findMany();
  }
}
