import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface FetchClientRequest {
  resaleId: string;
  page?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
}

export class FetchClientService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: FetchClientRequest) {
    const users: User[] = await this.userRepository.findAllClients(
      data.resaleId,
      data.page || 1,
      data.pageSize || 10,
      data.orderBy
    );

    const response = users.map((user: any) => {
      return {
        ...user.client,
        email: user.email,
      }
    });

    return response;
  }
}