import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { FetchClientGasCylinderService } from "../fetch-client-gas-cylinder-service";

export function makeFetchClientGasCylinderService(): FetchClientGasCylinderService {
  const gasCylinderRepository = new PrismaGasCylinderRepository();

  const service = new FetchClientGasCylinderService(gasCylinderRepository);

  return service;
}
