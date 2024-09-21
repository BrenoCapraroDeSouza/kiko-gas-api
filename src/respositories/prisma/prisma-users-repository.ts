import { Prisma, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaResaleRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
