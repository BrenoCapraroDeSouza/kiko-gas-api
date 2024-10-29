import { Signal, User } from "@prisma/client";
import { SignalRepository } from "../repositories/signal-repository";

interface FetchSignalRequest {
  resaleId: string;
  page?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
}

export class FetchSignalService {
  constructor(private signalRepository: SignalRepository) {}

  async execute(data: FetchSignalRequest) {
    const signals: Signal[] = await this.signalRepository.findAll(
      data.resaleId,
      data.page || 1,
      data.pageSize || 10,
      data.orderBy
    );

    return signals;
  }
}
