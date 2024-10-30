import { GasCylinder } from "@prisma/client";
import { GasCylinderRepository } from "../repositories/gas-cylinder-repository";
import { UserRepository } from "../repositories/user-repository";

interface UpdateGasCylinderRequest {
    id: string;
    userId: string;
    name?: string;
    description?: string;
    price?: number;
}

export class UpdateGasCylinderService {
    constructor(
        private userRepository: UserRepository,
        private gasCylinderRepository: GasCylinderRepository
    ) {}

    async execute(data: UpdateGasCylinderRequest): Promise<GasCylinder> {
        
        const { id, userId, ...cylinderData } = data;

        const { resale } = await this.userRepository.findById(userId);
        
        if(!resale) {
            throw new Error("Resale não encontrado");
        }

        const gasCylinder = await this.gasCylinderRepository.updateGasCylinder(id, {
            ...cylinderData,
            }
        );

        return gasCylinder;
    }

}