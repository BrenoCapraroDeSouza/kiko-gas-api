import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaClientRepository } from "../../repositories/prisma/prisma-client-repository";
import { RegisterClientAddressService } from "../register-client-address-service";

export function makeRegisterClientAddressService() {
    const userRepository = new PrismaUserRepository();
    const clientRepository = new PrismaClientRepository();

    const service = new RegisterClientAddressService(userRepository, clientRepository);

    return service;
}