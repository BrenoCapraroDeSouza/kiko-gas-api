import { Prisma, Resale } from "@prisma/client";
import { ResaleRepository } from "../resale-repository";
import { prisma } from "../../lib/prisma";

export class PrismaResaleRepository implements ResaleRepository {
  async create(data: Prisma.ResaleCreateInput): Promise<Resale> {
    const resale = await prisma.resale.create({
      data,
    });

    return resale;
  }

  async findById(id: string): Promise<Resale | null> {
    return await prisma.resale.findUnique({
      where: {
        id,
      },
    });
  }
}
