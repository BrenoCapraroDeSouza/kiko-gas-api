import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface FetchResaleRequest {
  page?: number;
  pageSize?: number;
}

export class FetchResaleService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: FetchResaleRequest) {
    const users: User[] = await this.userRepository.findAllResales(
      data.page || 1,
      data.pageSize || 10
    );

    
    const response = users.map((user: any) => {
      
      console.log(user);

      return {
        ...user.resale,
        email: user.email,
      }
    });

    
    return response;
  }
}
