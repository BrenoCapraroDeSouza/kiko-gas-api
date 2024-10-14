import { Prisma, GasCylinder } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class GasCylinderRepository implements GasCylinderRepository {
  register(data: Prisma.GasCylinderCreateInput): Promise<GasCylinder> {
    return prisma.gasCylinder.create({ data });
  }

  async findById(id: string): Promise<GasCylinder | null> {
    return prisma.gasCylinder.findUnique({ where: { id } });
  }

  async fetchAllByResaleId(
    resaleId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<GasCylinder[]> {
    const skip = (page - 1) * pageSize;

    return await prisma.gasCylinder.findMany({
      where: { resaleId: resaleId },
      skip,
      take: pageSize,
    });
  }
}
