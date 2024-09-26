import { PrismaClientsRepository } from "../../../respositories/prisma/prisma-clients-repository";
import { PrismaResaleRepository } from "../../../respositories/prisma/prisma-resales-repository";
import { PrismaUsersRepository } from "../../../respositories/prisma/prisma-users-repository";
import { RegisterService } from "../register-service";

export function makeRegisterService() {
  const clientsRepository = new PrismaClientsRepository();
  const usersRepository = new PrismaUsersRepository();
  const resaleRepository = new PrismaResaleRepository();

  const service = new RegisterService(
    clientsRepository,
    resaleRepository,
    usersRepository
  );

  return service;
}
