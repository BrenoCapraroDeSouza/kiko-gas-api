import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaClientRepository } from "../../repositories/prisma/prisma-client-repository";
import { RegisterClientService } from "../register-client-service";

export function makeRegisterClientService(): RegisterClientService {
  const userRepository = new PrismaUserRepository();
  const clientRepository = new PrismaClientRepository();

  const service = new RegisterClientService(userRepository, clientRepository);

  return service;
}
