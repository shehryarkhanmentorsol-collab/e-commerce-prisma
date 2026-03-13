import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { BaseRepository, IQueryOptions } from "../../base.repository";
import { CreatePaymentModel } from "../../../../payments/models/create-payment.model";
import { PaymentReadModel } from "../../../../payments/models/payment-read.model";
import { PaymentStatus } from "../../../../payments/enums/payments.enum";

@Injectable()
export class PaymentRepository extends BaseRepository{
    constructor(prisma: PrismaService){
        super(prisma)
    }

    async create(model: CreatePaymentModel, options?: IQueryOptions): Promise<PaymentReadModel>{
        const {db} = this.parseOptions(options)

        const order = await db.order.findUnique({where: {id: model.orderId }});
        if(!order) throw new NotFoundException('Order not found')

        try {
            const payment = await db.payment.create({
                data:{
                    orderId: model.orderId,
                    amount: order.total,
                    method: model.method ?? null,
                    status: PaymentStatus.PENDING
                }
            })
       return PaymentReadModel.fromPrisma(payment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create payment', {
        cause: new Error(`Error creating payment: ${(error as Error).message}`),
      });
    }
  }

  async findByOrder(orderId: string, options?: IQueryOptions): Promise<PaymentReadModel | null>{
       const {db} = this.parseOptions(options)
       
       const payment = await db.payment.findUnique({where: {orderId}});

       return payment ? PaymentReadModel.fromPrisma(payment) : null
  }

    async updateStatus(id: string, status: PaymentStatus, options?: IQueryOptions): Promise<PaymentReadModel> {
    const { db } = this.parseOptions(options);

    const existing = await db.payment.findUnique({ where: { id } });

    if (!existing) throw new NotFoundException('Payment not found');
    const updated = await db.payment.update({ where: { id }, data: { status } });
    return PaymentReadModel.fromPrisma(updated);
  }

}