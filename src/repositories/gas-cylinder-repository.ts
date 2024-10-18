import { Prisma, GasCylinder, CustomerGasCylinder } from "@prisma/client";

export interface GasCylinderRepository {
  register(data: Prisma.GasCylinderCreateInput): Promise<GasCylinder>;

  fetchAllByResaleId(
    resaleId: string,
    page?: number,
    pageSize?: number,
    orderBy?: "asc" | "desc"
  ): Promise<GasCylinder[]>;

  fetchAllByClientId(
    clientId: string,
    page?: number,
    pageSize?: number,
    orderBy?: "asc" | "desc"
  ): Promise<CustomerGasCylinder[]>;

  findById(id: string): Promise<GasCylinder | null>;
}
