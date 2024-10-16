import { PrismaClientRepository } from "../../repositories/prisma/prisma-client-repository";
import { FetchClientAddressesService } from "../fetch-client-addresses-service";

export function makeFetchClientAddressesService(): FetchClientAddressesService {
  const clientRepository = new PrismaClientRepository();
  const service = new FetchClientAddressesService(clientRepository);

  return service;
}
