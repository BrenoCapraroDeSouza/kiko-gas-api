import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { client: true, resale: true },
    });

    return user;
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { client: true, resale: true },
    });
  }

  async findAllClients(
    resaleId: string,
    page: number = 1,
    pageSize: number = 10,
    orderBy?: "asc" | "desc"
  ): Promise<User[]> {
    const skip = (page - 1) * pageSize;

    let orderDirection: Prisma.SortOrder = "asc";

    if (orderBy === "desc") {
      orderDirection = "desc";
    }

    return await prisma.user.findMany({
      where: {
        role: "CLIENT",
        client: {
          resaleId: resaleId,
        },
      },
      skip,
      take: pageSize,
      orderBy: {
        client: {
          createdAt: orderDirection,
        },
      },
      include: {
        client: true,
      },
    });
  }

  async findAllResales(
    page: number = 1,
    pageSize: number = 10
  ): Promise<User[]> {
    const skip = (page - 1) * pageSize;

    return await prisma.user.findMany({
      where: {
        role: "RESALE",
      },
      skip,
      take: pageSize,
      include: {
        resale: true,
      },
    });
  }
}
