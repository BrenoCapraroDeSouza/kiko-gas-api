import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { FetchResaleService } from "../fetch-resale-service";

export function makeFetchResaleService(): FetchResaleService {
  const usersRepository = new PrismaUserRepository();

  const service = new FetchResaleService(usersRepository);

  return service;
}
