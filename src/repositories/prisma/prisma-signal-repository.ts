import { Prisma, Signal, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { SignalRepository } from "../signal-repository";

export class PrismaSignalRepository implements SignalRepository {
  async create(data: Prisma.SignalCreateInput): Promise<Signal> {
    return prisma.signal.create({ data });
  }

  async findById(id: string) {
    return prisma.signal.findUnique({
      where: { id },
      include: { client: true, resale: true },
    });
  }

  async findAll(
    resaleId: string,
    page: number = 1,
    pageSize: number = 10,
    orderBy?: "asc" | "desc"
  ): Promise<Signal[]> {
    const skip = (page - 1) * pageSize;

    let orderDirection: Prisma.SortOrder = "asc";

    if (orderBy === "desc") {
      orderDirection = "desc";
    }

    return prisma.signal.findMany({
      where: {
        resaleId: resaleId,
      },
      skip,
      take: pageSize,
      orderBy: {
        createdAt: orderDirection,
      },
    });
  }
}
