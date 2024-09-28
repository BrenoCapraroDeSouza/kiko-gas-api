import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user-repository";
import { ResaleRepository } from "../repositories/resale-repository";
import { Resale, User, Prisma } from "@prisma/client";

interface RegisterResaleRequest {
  email: string;
  password: string;
  name: string;
  address: Prisma.AddressCreateInput;
  phone: string;
  cnpj: string;
}

export class RegisterResaleService {
  constructor(
    private userRepository: UserRepository,
    private resaleRepository: ResaleRepository
  ) {}

  async execute(data: RegisterResaleRequest): Promise<Resale> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user: User = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role: "RESALE",
    });

    const resale: Resale = await this.resaleRepository.create({
      name: data.name,
      address: data.address,
      phone: data.phone,
      cnpj: data.cnpj,
      user: { connect: { id: user.id } },
    });

    return resale;
  }
}
