import { Prisma, GasCylinder } from "@prisma/client";

export interface GasCylinderRepository {
  register(data: Prisma.GasCylinderCreateInput): Promise<GasCylinder>;
  fetchAllByResaleId(
    resaleId: string,
    page?: number,
    pageSize?: number
  ): Promise<GasCylinder[]>;
  findById(id: string): Promise<GasCylinder | null>;
}
