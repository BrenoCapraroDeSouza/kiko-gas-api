import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { FetchClientGasByAddressService } from "../fetch-client-gas-by-address-id";

export function makeFetchClientGasByAddressService(): FetchClientGasByAddressService {
  const gasCylinderRepository = new PrismaGasCylinderRepository();
  const service = new FetchClientGasByAddressService(gasCylinderRepository);

  return service;
}
