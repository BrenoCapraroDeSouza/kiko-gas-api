import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { GasCylinder } from "@prisma/client";

interface FetchGasCylinderRequest {
  resaleId: string;
  page?: number;
  pageSize?: number;
}

export class FetchGasCylinderService {
  constructor(private gascylinderRepository: GasCylinderRepository) {}

  async execute(data: FetchGasCylinderRequest): Promise<GasCylinder[]> {
    const gascylinder: GasCylinder[] =
      await this.gascylinderRepository.fetchAllByResaleId(
        data.resaleId,
        data.page || 1,
        data.pageSize || 10
      );

    return gascylinder;
  }
}
