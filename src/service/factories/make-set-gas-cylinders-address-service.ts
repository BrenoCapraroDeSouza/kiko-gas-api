import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { SetGasCylinderAddressService } from "../set-gas-cylinders-address-service";

export function makeSetGasCylindersService(): SetGasCylinderAddressService {
  const gasCylinderRepository = new PrismaGasCylinderRepository();
  const service = new SetGasCylinderAddressService(gasCylinderRepository);

  return service;
}
