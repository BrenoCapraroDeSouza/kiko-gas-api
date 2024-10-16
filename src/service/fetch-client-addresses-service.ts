import { ClientRepository } from "../repositories/client-repository";

interface ClientAddress {
    name: string;
    address: string;
}

interface FetchClientAddressesRequest {
  clientId: string;
}

export class FetchClientAddressesService {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: FetchClientAddressesRequest): Promise<ClientAddress[]> {
    const addresses = await this.clientRepository.fetchAllAddresses(data.clientId);
    return addresses ?? [];
  }
}