import { PrismaUsersRepository } from "../../../respositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate-service";

export function makeAuthenticateService() {
  const resalesRepository = new PrismaUsersRepository();
  const service = new AuthenticateService(resalesRepository);

  return service;
}
