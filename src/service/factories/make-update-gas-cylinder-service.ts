import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { UpdateGasCylinderService } from "../update-gas-cylinder-service";

export function makeUpdateGasCylinderService(): UpdateGasCylinderService {
  const userRepository = new PrismaUserRepository();
  const gasCylinderRepository = new PrismaGasCylinderRepository();

  const service = new UpdateGasCylinderService(
    userRepository,
    gasCylinderRepository
  );

  return service;
}
