import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { CustomerGasCylinder } from "@prisma/client";

interface FetchClientGasCylinderRequest {
  id: string;
}

export class FetchClientGasByAddressService {
  constructor(private gasCylinderRepository: GasCylinderRepository) {}

  async execute(
    data: FetchClientGasCylinderRequest
  ): Promise<CustomerGasCylinder[]> {
    const customerGasCylinder = await this.gasCylinderRepository.findGasByAddressId(
      data.id,
    ) || [];

    return customerGasCylinder as any;
  }
}
