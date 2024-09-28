import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaResaleRepository } from "../../repositories/prisma/prisma-resale-repository";
import { RegisterResaleService } from "../register-resale-service";

export function makeRegisterResaleService(): RegisterResaleService {
  const userRepository = new PrismaUserRepository();
  const resaleRepository = new PrismaResaleRepository();
  const service = new RegisterResaleService(userRepository, resaleRepository);

  return service;
}
