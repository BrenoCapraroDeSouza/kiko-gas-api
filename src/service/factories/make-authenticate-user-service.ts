import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { AuthenticateUserService } from "../authenticate-user-service";

export function makeAuthenticateUserService(): AuthenticateUserService {
  const userRepository = new PrismaUserRepository();
  const service = new AuthenticateUserService(userRepository);

  return service;
}
