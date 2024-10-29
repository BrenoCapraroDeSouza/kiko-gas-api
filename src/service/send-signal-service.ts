import { Signal, SignalType, PaymentType } from "@prisma/client";
import { SignalRepository } from "../repositories/signal-repository";
import { UserRepository } from "../repositories/user-repository";
import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";

interface CylinderRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  paymentType: PaymentType | null;
  exchange: number | null;
}

interface ClientRequest {
  id: string;
  name: string;
  phone: string;
  cpfcnpj: string;
  address: string;
  cylinder: CylinderRequest;
}

interface RegisterSignalRequest {
  type: SignalType;
  client: ClientRequest;
}

export class SendSignalService {
  constructor(
    private signalRepository: SignalRepository,
    private userRepository: UserRepository,
    private gasCylinderRepository: GasCylinderRepository
  ) {}

  async execute(data: RegisterSignalRequest): Promise<Signal> {
    const { client } = await this.userRepository.findById(data.client.id);

    if (!client) {
      throw new Error("Client não encontrado");
    }

    console.log(data);
    const cylinder = await this.gasCylinderRepository.findById(
      data.client.cylinder.id
    );

    if (!cylinder) {
      throw new Error("Cilindro não encontrado");
    }

    const signal = await this.signalRepository.create({
      ...data,
      resaleId: client.resaleId,
    });

    return signal;
  }
}
