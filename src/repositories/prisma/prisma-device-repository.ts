import { Prisma, Client, Device } from "@prisma/client";
import { ClientRepository } from "../client-repository";
import { prisma } from "../../lib/prisma";
import { DeviceRepository } from "../device-repository";

export class PrismaDeviceRepository implements DeviceRepository {
  register(data: Prisma.DeviceCreateInput): Promise<Device> {
    return prisma.device.create({ data });
  }

  async findById(id: string): Promise<Device | null> {
    return prisma.device.findUnique({ where: { id } });
  }
}
