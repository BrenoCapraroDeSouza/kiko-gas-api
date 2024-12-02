import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { CustomerGasCylinder } from "@prisma/client";

interface FetchClientGasCylinderRequest {
  addressId: string;
  clientId: string;
}

export class FetchClientGasByAddressService {
  constructor(private gasCylinderRepository: GasCylinderRepository) {}

  async execute(
    data: FetchClientGasCylinderRequest
  ): Promise<CustomerGasCylinder[]> {
    const customerGasCylinder = await this.gasCylinderRepository.findGasByAddressId(
      data.addressId,
      data.clientId
    ) || [];

    return customerGasCylinder as any;
  }
}
