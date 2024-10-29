import { PrismaSignalRepository } from "../../repositories/prisma/prisma-signal-repository";
import { FetchSignalService } from "../fetch-signal-service";

export function makeFetchSignalService(): FetchSignalService {
  const signalRepository = new PrismaSignalRepository();

  const service = new FetchSignalService(signalRepository);

  return service;
}
