import { Prisma, Client, ClientAddress, Signal } from "@prisma/client";

export interface SignalRepository {
  create(data: Prisma.SignalCreateInput): Promise<Signal>;
  findById(id: string): Promise<Signal | null>;
  findAll(
    resaleId: string,
    page?: number,
    pageSize?: number,
    orderBy?: "asc" | "desc"
  ): Promise<Signal[]>;
}
