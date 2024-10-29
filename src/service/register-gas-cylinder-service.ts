import { GasCylinder } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";

interface RegisterGasCylinderRequest {
  name: string;
  description?: string;
  userId: string;
  weight: number;
  price?: number;
}

export class RegisterGasCylinderService {
  constructor(
    private userRepository: UserRepository,
    private gasCylinderRepository: GasCylinderRepository
  ) {}

  async execute(data: RegisterGasCylinderRequest): Promise<GasCylinder> {
    const { price, userId, name, weight, description } = data;

    const { resale } = await this.userRepository.findById(userId);

    if (!resale) {
      throw new Error("Resale não encontrado");
    }

    const gasCylinder = await this.gasCylinderRepository.register({
      name,
      description: description ? description : "",
      price: price ? price : 100,
      weight,
      resaleId: resale.id,
      tare: 10,
    });

    return gasCylinder;
  }
}
