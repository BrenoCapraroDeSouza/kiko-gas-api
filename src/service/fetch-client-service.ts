import bcrypt from "bcryptjs";
import { ClientRepository } from "../repositories/client-repository";
import { Client, User } from "@prisma/client";

interface FetchClientRequest {
  page?: number;
  pageSize?: number;
}

export class FetchClientService {
  constructor(
    private clientRepository: ClientRepository
  ) {}

  async execute(data: FetchClientRequest): Promise<Client[]> {

    const client: Client[] = await this.clientRepository.findAll(
        data.page || 1,
        data.pageSize || 10
    );

    return client;
  }
}
