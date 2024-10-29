import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { PrismaSignalRepository } from "../../repositories/prisma/prisma-signal-repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { SendSignalService } from "../send-signal-service";

export function makeSendSignalService(): SendSignalService {
  const signalRepository = new PrismaSignalRepository();
  const cylinderRepository = new PrismaGasCylinderRepository();
  const userRepository = new PrismaUserRepository();

  const service = new SendSignalService(
    signalRepository,
    userRepository,
    cylinderRepository
  );

  return service;
}
