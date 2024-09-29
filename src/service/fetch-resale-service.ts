import bcrypt from "bcryptjs";
import { ResaleRepository } from "../repositories/resale-repository";
import { Resale } from "@prisma/client";

interface FetchResaleRequest {
  page?: number;
  pageSize?: number;
}

export class FetchResaleService {
  constructor(
    private resaleRepository: ResaleRepository
  ) {}

  async execute(data: FetchResaleRequest): Promise<Resale[]> {

    const resale: Resale[] = await this.resaleRepository.findAll(
        data.page || 1,
        data.pageSize || 10
    );

    return resale;
  }
}
