import { PrismaResaleRepository } from "../../repositories/prisma/prisma-Resale-repository";
import { FetchResaleService } from "../fetch-resale-service";

export function makeFetchResaleService(): FetchResaleService {
  const resaleRepository = new PrismaResaleRepository();

  const service = new FetchResaleService(resaleRepository);

  return service;
}
