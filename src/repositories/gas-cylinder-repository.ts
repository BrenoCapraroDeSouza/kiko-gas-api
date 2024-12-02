import { Prisma, GasCylinder, CustomerGasCylinder } from "@prisma/client";

export interface GasCylinderRepository {
  register(data: Prisma.GasCylinderCreateInput): Promise<GasCylinder>;

  fetchAllByResaleId(
    resaleId: string,
    page?: number,
    pageSize?: number,
    orderBy?: "asc" | "desc"
  ): Promise<GasCylinder[]>;

  fetchAllClientGasById(
    clientId: string,
    page?: number,
    pageSize?: number,
    orderBy?: "asc" | "desc"
  ): Promise<CustomerGasCylinder[]>;

  findGasByAddressId(
    addressId: string,
    clientId: string
  ): Promise<CustomerGasCylinder | null>;

  findById(
    id: string
  ): Promise<GasCylinder | null>;

  updateGasCylinder(
    id: string, 
    data: Prisma.GasCylinderUpdateInput
  ): Promise<GasCylinder>;
}
