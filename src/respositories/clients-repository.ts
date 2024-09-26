import { Client, Prisma } from "@prisma/client";

export interface ClientsRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  update(id: string, data: Prisma.ClientUpdateInput): Promise<Client | null>;
}
