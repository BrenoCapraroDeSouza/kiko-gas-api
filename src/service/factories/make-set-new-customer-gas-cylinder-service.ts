import { PrismaGasCylinderRepository } from "../../repositories/prisma/prisma-gas-cylinder-repository";
import { SetNewCustomerGasCylinderService } from "../set-new-customer-gas-cylinder-service";

export function makeSetNewCustomerGasCylinderService(): SetNewCustomerGasCylinderService {
  const gasCylinderRepository = new PrismaGasCylinderRepository();
  const service = new SetNewCustomerGasCylinderService(gasCylinderRepository);

  return service;
}
