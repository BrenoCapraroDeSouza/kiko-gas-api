import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user-repository";
import { User } from "@prisma/client";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  user: User;
}

export class AuthenticateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    return { user };
  }
}
