import { Prisma, Device } from "@prisma/client";

export interface DeviceRepository {
  register(data: Prisma.DeviceCreateInput): Promise<Device>;
  findById(id: string): Promise<Device | null>;
}
