import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { CustomerGasCylinder } from "@prisma/client";

interface FetchClientGasCylinderRequest {
  clientId: string;
  page?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
}

export class FetchClientGasCylinderService {
  constructor(private gasCylinderRepository: GasCylinderRepository) {}

  async execute(
    data: FetchClientGasCylinderRequest
  ): Promise<CustomerGasCylinder[]> {
    const customerGasCylinder: CustomerGasCylinder[] =
      await this.gasCylinderRepository.fetchAllClientGasById(
        data.clientId,
        data.page || 1,
        data.pageSize || 10,
        data.orderBy
      );

    return customerGasCylinder;
  }
}
