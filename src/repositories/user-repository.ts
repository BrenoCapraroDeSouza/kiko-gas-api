import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string);
  findAllClients(resaleId: string, page?: number, pageSize?: number, orderBy?: "asc" | "desc"): Promise<User[]>;
  findAllResales(page?: number, pageSize?: number, orderBy?: "asc" | "desc"): Promise<User[]>;
}
