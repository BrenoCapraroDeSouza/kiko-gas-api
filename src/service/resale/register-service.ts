import { Resale } from "@prisma/client";
import { ResaleRepository } from "../../respositories/resale-repository";

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
  constructor(private repository: ResaleRepository) {}

  async execute(
    data: RegisterServiceRequest
  ): Promise<RegisterServiceResponse> {
    const resale = await this.repository.create({
      name: data.name,
      phone: data.phone,
      cpfcnpj: data.cpfcnpj,
      email: data.email,
      password: data.password,
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
