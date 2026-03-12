import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { BaseRepository, IQueryOptions } from "../../base.repository";
import { CreateAddressModel } from "../../../../adress/models/create-address.model";
import { AddressReadModel } from "../../../../adress/models/address-read.model";
import { UpdateAddressModel } from "../../../../adress/models/update-address.model";

@Injectable()
export class AddressRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(model: CreateAddressModel, options?: IQueryOptions): Promise<AddressReadModel> {
    const { db } = this.parseOptions(options);
    try {
      if (model.isDefault) {
        await db.address.updateMany({ where: { userId: model.userId }, data: { isDefault: false } });
      }
      const address = await db.address.create({ data: model.toCreateInput() });
      return AddressReadModel.fromPrisma(address);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create address', {
        cause: new Error(`Error creating address: ${(error as Error).message}`),
      });
    }
  }

  async findByUser(userId: string, options?: IQueryOptions): Promise<AddressReadModel[]> {
    const { db } = this.parseOptions(options);
    const addresses = await db.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
    return addresses.map((a) => AddressReadModel.fromPrisma(a));
  }

  async findById(id: string, options?: IQueryOptions): Promise<AddressReadModel | null> {
    const { db } = this.parseOptions(options);
    const address = await db.address.findUnique({ where: { id } });
    return address ? AddressReadModel.fromPrisma(address) : null;
  }

  async update(model: UpdateAddressModel, userId: string, options?: IQueryOptions): Promise<AddressReadModel> {
    const { db } = this.parseOptions(options);
    const existing = await db.address.findUnique({ where: { id: model.id } });
    if (!existing) throw new NotFoundException('Address not found');
    if (existing.userId !== userId) throw new ForbiddenException('Not your address');
    if (model.isDefault) {
      await db.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    try {
      const updated = await db.address.update({
        where: { id: model.id },
        data: model.toUpdateInput(),
      });
      return AddressReadModel.fromPrisma(updated);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update address', {
        cause: new Error(`Error updating address: ${(error as Error).message}`),
      });
    }
  }

  async delete(id: string, userId: string, options?: IQueryOptions): Promise<void> {
    const { db } = this.parseOptions(options);
    const existing = await db.address.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Address not found');
    if (existing.userId !== userId) throw new ForbiddenException('Not your address');
    await db.address.delete({ where: { id } });
  }
}