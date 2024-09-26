import { Client } from "@prisma/client";
import { UsersRepository } from "../../respositories/users-repository";
import { hash } from "bcryptjs";
import { ClientsRepository } from "../../respositories/clients-repository";

interface RegisterServiceRequest {
  name: string;
  email: string;
  cpfcnpj: string;
  phone: string;
  password: string;
}

interface RegisterServiceResponse {
  client: Client;
}

export class RegisterService {
  constructor(
    private clientsRepository: ClientsRepository,
    private userRepository: UsersRepository
  ) {}

  async execute(
    data: RegisterServiceRequest
  ): Promise<RegisterServiceResponse> {
    const password_hash = await hash(data.password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail) {
      throw new Error("User already exists");
    }

    const user = await this.userRepository.create({
      email: data.email,
      password: password_hash,
      userType: "CLIENT",
    });

    const client = await this.clientsRepository.create({
      name: data.name,
      phone: data.phone,
      cpfcnpj: data.cpfcnpj,
      user: {
        connect: { id: user.id },
      },
    });

    return { client };
  }
}
