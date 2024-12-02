import { Prisma, GasCylinder, CustomerGasCylinder } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { GasCylinderRepository } from "../gas-cylinder-repository";

export class PrismaGasCylinderRepository implements GasCylinderRepository {
  register(data: Prisma.GasCylinderCreateInput): Promise<GasCylinder> {
    return prisma.gasCylinder.create({ data });
  }

  async findById(id: string): Promise<GasCylinder | null> {
    return prisma.gasCylinder.findUnique({ where: { id } });
  }

  async fetchAllByResaleId(
    resaleId: string,
    page: number = 1,
    pageSize: number = 10,
    orderBy: "asc" | "desc" = "asc"
  ): Promise<GasCylinder[]> {
    const skip = (page - 1) * pageSize;

    const gasCylinders = await prisma.gasCylinder.findMany({
      where: { resaleId: resaleId },
    });

    const sortedCylinders = gasCylinders.sort((a, b) => {
      const numA = parseInt(a.name.slice(1));
      const numB = parseInt(b.name.slice(1));
      return orderBy === "asc" ? numA - numB : numB - numA;
    });

    return sortedCylinders.slice(skip, skip + pageSize);
  }

  async fetchAllClientGasById(
    clientId: string,
    page: number = 1,
    pageSize: number = 10,
    orderBy: "asc" | "desc" = "asc"
  ): Promise<CustomerGasCylinder[]> {
    const skip = (page - 1) * pageSize;

    const customerGasCylinder = await prisma.customerGasCylinder.findMany({
      where: {
        clientId: clientId,
      },
    });

    if (!customerGasCylinder) {
      return [];
    }

    return customerGasCylinder;
  }

  async findGasByAddressId(id: string): Promise<CustomerGasCylinder | null> {
    return null; //to be implemented
  }

  async updateGasCylinder(
    id: string, 
    data: Prisma.GasCylinderUpdateInput
  ): Promise<GasCylinder> {
    const addressWithClientGas = await prisma.customerGasCylinder.findUnique({
      where: { id },
    });
  }
}
