import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { RegisterGasCylinderService } from "../register-gas-cylinder-service";

export function makeRegisterGasCylinderService(): RegisterGasCylinderService {
  const userRepository = new PrismaUserRepository();
  const gasCylinderRepository = new PrismaGasCylinderRepository();

  const service = new RegisterGasCylinderService(
    userRepository,
    gasCylinderRepository
  );

  return service;
}
