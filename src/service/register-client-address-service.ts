import { UserRepository } from "../repositories/user-repository";
import { ClientRepository } from "../repositories/client-repository";

interface AddressData {
  name: string;
  address: string;
}

interface RegisterClientAddressRequest {
  clientId: string;
  addressData: AddressData;
}

export class RegisterClientAddressService {
  constructor(
    private userRepository: UserRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute({ clientId, addressData }: RegisterClientAddressRequest) {

    const { client } = await this.userRepository.findById(clientId);

    if(!client) {
        throw new Error("Cliente não encontrado!");
    }

    const updatedClient = await this.clientRepository.registerAddress(client.id, {
        name: addressData.name,
        address: addressData.address,
    });

    return updatedClient;
  }
}