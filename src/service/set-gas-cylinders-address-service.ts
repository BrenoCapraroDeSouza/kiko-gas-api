import { Client } from "@prisma/client";
import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";

interface SetCylinderAddressRequest {
  clientId: string;
  cylinderId: string;
  addressId: string;
}

export class SetGasCylinderAddressService {
  constructor(private gasCylinderRepository: GasCylinderRepository) {}

  async execute(data: SetCylinderAddressRequest): Promise<Client> {
    let { addressId, clientId, cylinderId } = data;

    const gasCylindersUpdated =
      this.gasCylinderRepository.setGasCylindersAddress(
        addressId,
        cylinderId,
        clientId
      );

    return gasCylindersUpdated;
  }
}
