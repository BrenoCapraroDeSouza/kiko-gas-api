import { Prisma, Resale } from "@prisma/client";

export interface ResaleRepository {
  create(data: Prisma.ResaleCreateInput): Promise<Resale>;
  findById(id: string): Promise<Resale | null>;
  update(id: string, data: Prisma.ResaleUpdateInput): Promise<Resale | null>;
  findAll(): Promise<Resale[]>;
}
