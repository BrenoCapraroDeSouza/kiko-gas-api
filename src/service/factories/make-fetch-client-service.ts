import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { FetchClientService } from "../fetch-client-service";

export function makeFetchClientService(): FetchClientService {
  const clientRepository = new PrismaUserRepository();

  const service = new FetchClientService(clientRepository);

  return service;
}
