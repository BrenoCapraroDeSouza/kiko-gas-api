import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { FetchGasCylinderService } from "../fetch-gas-cylinder-service";

export function makeFetchGasCylinderService(): FetchGasCylinderService {
  const gasCylinderRepository = new PrismaGasCylinderRepository();

  const service = new FetchGasCylinderService(gasCylinderRepository);

  return service;
}
