import { Prisma, Client, ClientAddress } from "@prisma/client";
import { ClientRepository } from "../client-repository";
import { prisma } from "../../lib/prisma";

export class PrismaClientRepository implements ClientRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return prisma.client.create({ data });
  }

  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.ClientUpdateInput
  ): Promise<Client | null> {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  async findAll(
    resaleId: string,
    page: number = 1, 
    pageSize: number = 10,
    orderBy?: "asc" | "desc"
  ): Promise<Client[]> {
    
    const skip = (page - 1) * pageSize;
    
    let orderDirection: Prisma.SortOrder = "asc";

    if(orderBy === "desc") orderDirection = "desc";
    
    return await prisma.client.findMany({
      where: { resaleId: resaleId },
      skip,
      take: pageSize,
      orderBy: { 
        createdAt: orderDirection 
      },
    });
  }

  async registerAddress(
    clientId: string, 
    addressData: Prisma.ClientAddressCreateInput
  ): Promise<Client> {
    return prisma.client.update({
      where: { id: clientId },
      data: {
        addresses: {
          push: {
            id: addressData.id,
            name: addressData.name,
            address: addressData.address,
          }
        }
      }
    });
  }

  async fetchAllAddresses(
    clientId: string
  ): Promise<ClientAddress[] | null> {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: {
        addresses: true,
      },
    });

    if (!client) {
      throw new Error("Client not found");
    }

    // const sortedAddresses = client.addresses.sort((a, b) => {
    //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // });
  
    // return sortedAddresses;

    return client.addresses;
  }
}