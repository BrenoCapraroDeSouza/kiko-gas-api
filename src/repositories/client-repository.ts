import { Prisma, Client, ClientAddress } from "@prisma/client";

export interface ClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  update(id: string, data: Prisma.ClientUpdateInput): Promise<Client | null>;
  findAll(resaleId: string, page?: number, pageSize?: number, orderBy?: "asc" | "desc"): Promise<Client[]>;
  registerAddress(clientId: string, addressData: Prisma.ClientAddressCreateInput): Promise<Client>;
  fetchAllAddresses(clientId: string): Promise<ClientAddress[] | null>;
}