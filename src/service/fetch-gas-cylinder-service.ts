import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { GasCylinder } from "@prisma/client";

interface FetchGasCylinderRequest {
  resaleId: string;
  page?: number;
  pageSize?: number;
}

export class FetchGasCylinderService {
  constructor(private gasCylinderRepository: GasCylinderRepository) {}

  async execute(data: FetchGasCylinderRequest): Promise<GasCylinder[]> {

    const gasCylinder: GasCylinder[] =
      await this.gasCylinderRepository.fetchAllByResaleId(
        data.resaleId,
        data.page || 1,
        data.pageSize || 10
      );
      
    return gasCylinder;
  }
}
