import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { GetUserService } from "../get-user-service";

export function makeGetUserService(): GetUserService {
  const userRepository = new PrismaUserRepository();
  const service = new GetUserService(userRepository);

  return service;
}
