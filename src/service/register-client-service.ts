import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user-repository";
import { ClientRepository } from "../repositories/client-repository";
import { Client, User, Prisma } from "@prisma/client";

interface RegisterClientRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  cpfcnpj: string;
  userId: string;
}

export class RegisterClientService {
  constructor(
    private userRepository: UserRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(data: RegisterClientRequest): Promise<Client> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { resale } = await this.userRepository.findById(data.userId);

    if (!resale) {
      throw new Error("Resale não encontrado");
    }

    const user: User = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role: "CLIENT",
    });

    const client: Client = await this.clientRepository.create({
      name: data.name,
      phone: data.phone,
      cpfcnpj: data.cpfcnpj,
      resale: resale.id ? { connect: { id: resale.id } } : undefined,
      user: { connect: { id: user.id } },
      addresses: [],
      devices: { create: [] },
    });

    return client;
  }
}
