import { UserRepository } from "../repositories/user-repository";
import { Device } from "@prisma/client";
import { DeviceRepository } from "../repositories/device-repository";

interface RegisterDeviceRequest {
  name: string;
  description?: string;
  userId: string;
  price?: number;
  customPrice?: number;
}

export class RegisterDeviceService {
  constructor(
    private userRepository: UserRepository,
    private deviceRepository: DeviceRepository
  ) {}

  async execute(data: RegisterDeviceRequest): Promise<Device> {
    const { customPrice, price, userId, name, description } = data;

    const { resale } = await this.userRepository.findById(userId);

    if (!resale) {
      throw new Error("Resale não encontrado");
    }

    const device = await this.deviceRepository.register({
      name,
      description: description ? description : "",
      gas: 100,
      weight: 25,
      tare: 50,
      customPrice: customPrice ? customPrice : 0,
      defaultPrice: price ? price : 100,
      resale: { connect: { id: resale.id } },
    });

    return device;
  }
}
