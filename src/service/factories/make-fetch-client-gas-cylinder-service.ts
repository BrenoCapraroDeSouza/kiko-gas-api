import { GasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { FetchClientGasCylinderService } from "../fetch-client-gas-cylinder-service";

export function makeFetchGasCylinderService(): FetchClientGasCylinderService {
  const gasCylinderRepository = new GasCylinderRepository();

  const service = new FetchClientGasCylinderService(gasCylinderRepository);

  return service;
}
