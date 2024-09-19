import { Prisma, Resale } from "@prisma/client";
import { ResaleRepository } from "../../respositories/resale-repository";

interface UpdateServiceRequest {
    id: string;
    name?: string;
    phone?: string;
    cpfcnpj?: string;
    email?: string;
    password?: string;
    address?: {
        state?: string;
        city?: string;
        neighborhood?: string;
        publicPlace?: string;
        number?: string;
        ie?: string;
    };
}

interface UpdateServiceResponse {
    resale: Resale | null;
}

export class UpdateService {
    constructor(private repository: ResaleRepository) {}

    async execute(
        data: UpdateServiceRequest
    ): Promise<UpdateServiceResponse> {
        const resale = await this.repository.update(data.id, {
            name: data.name,
            phone: data.phone,
            cpfcnpj: data.cpfcnpj,
            email: data.email,
            password: data.password,
            address: data.address ? {
              update: {
                state: data.address.state,
                city: data.address.city,
                neighborhood: data.address.neighborhood,
                publicPlace: data.address.publicPlace,
                number: data.address.number,
                ie: data.address.ie,
                },
            } : undefined,
        });
      
        return { resale: resale || null };
    }
}
