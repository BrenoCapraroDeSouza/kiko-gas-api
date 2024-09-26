import { PrismaClientsRepository } from "../../../respositories/prisma/prisma-clients-repository";
import { PrismaUsersRepository } from "../../../respositories/prisma/prisma-users-repository";
import { RegisterService } from "../register-service";

export function makeRegisterService() {
  const clientsRepository = new PrismaClientsRepository();
  const usersRepository = new PrismaUsersRepository();

  const service = new RegisterService(clientsRepository, usersRepository);

  return service;
}
