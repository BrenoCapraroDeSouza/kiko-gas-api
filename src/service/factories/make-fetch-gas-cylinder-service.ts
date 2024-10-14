import { GasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { FetchGasCylinderService } from "../fetch-gas-cylinder-service";

export function makeFetchGasCylinderService(): FetchGasCylinderService {
  const gasCylinderRepository = new GasCylinderRepository();

  const service = new FetchGasCylinderService(gasCylinderRepository);

  return service;
}
