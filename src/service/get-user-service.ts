import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";

interface GetUserRequest {
  userId: string;
}

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: GetUserRequest): Promise<User[]> {
    const user = this.userRepository.findById(data.userId);

    return user;
  }
}
