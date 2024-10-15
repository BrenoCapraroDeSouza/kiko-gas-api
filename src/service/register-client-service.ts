import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user-repository";
import { ClientRepository } from "../repositories/client-repository";
import { Client, User } from "@prisma/client";

interface GasCylinder {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface RegisterClientRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  cpfcnpj: string;
  userId: string;
  customerGasCylinder: {
    gasCylinders: GasCylinder[];
  };
}

export class RegisterClientService {
  constructor(
    private userRepository: UserRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(data: RegisterClientRequest): Promise<Client> {
    
    let { phone, cpfcnpj } = data;

    phone = phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");

    if(cpfcnpj.length === 11) {
      cpfcnpj = cpfcnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"$1.$2.$3-$4");
    }

    if(cpfcnpj.length === 14) {
      cpfcnpj = cpfcnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5");
    }

    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { resale } = await this.userRepository.findById(data.userId);

    if (!resale) {
      throw new Error("Resale não encontrado");
    }

    if (!data.customerGasCylinder) {
      throw new Error("Cilindro de gás não informado");
    }

    const user: User = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role: "CLIENT",
    });

    const client: Client = await this.clientRepository.create({
      name: data.name,
      phone: phone,
      cpfcnpj: cpfcnpj,
      resale: resale.id ? { connect: { id: resale.id } } : undefined,
      user: { connect: { id: user.id } },
      addresses: [],
      customerGasCylinder: { create: data.customerGasCylinder },
    });

    return client;
  }
}
