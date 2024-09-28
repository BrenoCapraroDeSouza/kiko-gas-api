import { Prisma, Client } from "@prisma/client";

export interface ClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  update(id: string, data: Prisma.ClientUpdateInput): Promise<Client | null>;
  findAll(): Promise<Client[]>;
}
