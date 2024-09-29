import { PrismaClientRepository } from "../../repositories/prisma/prisma-client-repository";
import { FetchClientService } from "../fetch-client-service";

export function makeFetchClientService(): FetchClientService {
  const clientRepository = new PrismaClientRepository();

  const service = new FetchClientService(clientRepository);

  return service;
}
