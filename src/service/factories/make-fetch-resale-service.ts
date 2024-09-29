import { PrismaResaleRepository } from "../../repositories/prisma/prisma-resale-repository";
import { FetchResaleService } from "../fetch-resale-service";

export function makeFetchResaleService(): FetchResaleService {
  const resaleRepository = new PrismaResaleRepository();

  const service = new FetchResaleService(resaleRepository);

  return service;
}
