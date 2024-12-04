import { Prisma, GasCylinder, CustomerGasCylinder } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { GasCylinderRepository } from "../gas-cylinder-repository";

export class PrismaGasCylinderRepository implements GasCylinderRepository {
  register(data: Prisma.GasCylinderCreateInput): Promise<GasCylinder> {
    return prisma.gasCylinder.create({ data });
  }

  async setGasCylindersAddress(
    addressId: string,
    cylinderId: string,
    clientId: string
  ): Promise<CustomerGasCylinder> {
    const customerGasCylinder = await prisma.customerGasCylinder.findUnique({
      where: { clientId },
      include: { gasCylinders: true },
    });

    if (!customerGasCylinder) {
      throw new Error("Cliente não encontrado");
    }

    const updatedCylinders = customerGasCylinder.gasCylinders.map((cylinder) =>
      cylinder.id === cylinderId ? { ...cylinder, addressId } : cylinder
    );

    const updatedGasCylinder = await prisma.customerGasCylinder.update({
      where: { clientId },
      data: {
        gasCylinders: updatedCylinders,
      },
    });

    return updatedGasCylinder;
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

  async findGasByAddressId(
    addressId: string,
    clientId: string
  ): Promise<CustomerGasCylinder | null> {
    const customerGasCylinder = await prisma.customerGasCylinder.findMany({
      where: {
        clientId: clientId,
      },
      select: {
        gasCylinders: true,
      },
    });

    if (!customerGasCylinder || customerGasCylinder.length === 0) {
      return null;
    }

    const filteredGasCylinders = customerGasCylinder[0].gasCylinders.filter(
      (gasCylinder) => gasCylinder.addressId === addressId
    );

    return filteredGasCylinders.length > 0 ? filteredGasCylinders : null;
  }

  async updateGasCylinder(
    id: string,
    data: Prisma.GasCylinderUpdateInput
  ): Promise<GasCylinder> {
    const addressWithClientGas = await prisma.gasCylinder.findUnique({
      where: { id },
    });

    if (!addressWithClientGas) {
      throw new Error("Gas cylinder not found");
    }

    return prisma.gasCylinder.update({
      where: { id },
      data,
    });
  }
}
