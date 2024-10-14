import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@prisma/client";

interface FetchClientRequest {
  resaleId;
  page?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
}

export class FetchClientService {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: FetchClientRequest): Promise<Client[]> {
    const client: Client[] = await this.clientRepository.findAll(
      data.resaleId,
      data.page || 1,
      data.pageSize || 10,
      data.orderBy
    );

    return client;
  }
}
