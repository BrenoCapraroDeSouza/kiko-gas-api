import { PrismaResaleRepository } from "../../../respositories/prisma/prisma-resale-repository";
import { RegisterService } from "../register-service";

export function makeRegisterService() {
  const resalesRepository = new PrismaResaleRepository();
  const service = new RegisterService(resalesRepository);

  return service;
}
