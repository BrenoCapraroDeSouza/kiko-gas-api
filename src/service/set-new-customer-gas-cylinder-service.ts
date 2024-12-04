import { CustomerGasCylinder } from "@prisma/client";
import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";

interface SetCustomerCylinderRequest {
  clientId: string;
  addressId: string;
  name: string;
  description?: string;
  price?: number;
}

export class SetNewCustomerGasCylinderService {
  constructor(private gasCylinderRepository: GasCylinderRepository) {}

  async execute(data: SetCustomerCylinderRequest): Promise<CustomerGasCylinder[]> {
    const { clientId, addressId, name, description, price } = data;

    const customerGasCylinder =
      this.gasCylinderRepository.setNewCustomerGasCylinder(
        clientId,
        addressId,
        name,
        description,
        price
      );

    return customerGasCylinder;
  }
}
