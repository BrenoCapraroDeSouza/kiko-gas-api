import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { CustomerGasCylinder } from "@prisma/client";

interface FetchClientGasCylinderRequest {
  clientId: string;
  page?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
}

export class FetchClientGasCylinderService {
  constructor(private gascylinderRepository: GasCylinderRepository) {}

  async execute(
    data: FetchClientGasCylinderRequest
  ): Promise<CustomerGasCylinder[]> {
    const gascylinder: CustomerGasCylinder[] =
      await this.gascylinderRepository.fetchAllByClientId(
        data.clientId,
        data.page || 1,
        data.pageSize || 10,
        data.orderBy
      );

    return gascylinder;
  }
}
