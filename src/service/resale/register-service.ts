import { Resale } from "@prisma/client";
import { ResaleRepository } from "../../respositories/resales-repository";
import { UsersRepository } from "../../respositories/users-repository";

interface RegisterServiceRequest {
  name: string;
  phone: string;
  cpfcnpj: string;
  email: string;
  password: string;
  address: {
    state: string;
    city: string;
    neighborhood: string;
    publicPlace: string;
    number: string;
    ie?: string;
  };
}

interface RegisterServiceResponse {
  resale: Resale;
}

export class RegisterService {
  constructor(
    private resaleRepository: ResaleRepository,
    private userRepository: UsersRepository
  ) {}

  async execute(
    data: RegisterServiceRequest
  ): Promise<RegisterServiceResponse> {
    const user = await this.userRepository.create({
      email: data.email,
      password: data.password,
      userType: "RESALE",
    });

    const resale = await this.resaleRepository.create({
      name: data.name,
      phone: data.phone,
      cpfcnpj: data.cpfcnpj,
      user: {
        connect: { id: user.id },
      },
      address: {
        create: {
          state: data.address.state,
          city: data.address.city,
          neighborhood: data.address.neighborhood,
          publicPlace: data.address.publicPlace,
          number: data.address.number,
          ie: data.address.ie,
        },
      },
    });

    return { resale };
  }
}
