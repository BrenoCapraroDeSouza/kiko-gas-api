import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { RegisterDeviceService } from "../register-device-service";
import { PrismaDeviceRepository } from "../../repositories/prisma/prisma-device-repository";

export function makeRegisterDeviceService(): RegisterDeviceService {
  const userRepository = new PrismaUserRepository();
  const deviceRepository = new PrismaDeviceRepository();

  const service = new RegisterDeviceService(userRepository, deviceRepository);

  return service;
}
