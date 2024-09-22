import { PrismaResaleRepository } from "../../../respositories/prisma/prisma-resales-repository";
import { PrismaUsersRepository } from "../../../respositories/prisma/prisma-users-repository";
import { RegisterService } from "../register-service";

export function makeRegisterService() {
  const resalesRepository = new PrismaResaleRepository();
  const usersRepository = new PrismaUsersRepository();

  const service = new RegisterService(resalesRepository, usersRepository);

  return service;
}
