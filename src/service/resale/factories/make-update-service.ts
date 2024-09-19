import { PrismaResaleRepository } from "../../../respositories/prisma/prisma-resale-repository";
import { UpdateService } from "../update-service";

export function makeUpdateService() {
  const resalesRepository = new PrismaResaleRepository();
  const service = new UpdateService(resalesRepository);

  return service;
}