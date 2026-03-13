import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PaymentRepository } from "../common/database/payments/repositories/payments.repository";
import { CreatePaymentModel } from "./models/create-payment.model";
import { PaymentReadModel } from "./models/payment-read.model";

@Injectable()
export class PaymentsService {
    constructor (private readonly paymentRepository: PaymentRepository){}

    async create(model: CreatePaymentModel): Promise<PaymentReadModel>{
        try {
            return await this.paymentRepository.create(model)
        } catch (error) {
         if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException('Failed to create payment');
    }
    }

    async findByOrder(orderId: string): Promise<PaymentReadModel>{
        try {
            const payment = await this.paymentRepository.findByOrder(orderId);
            if(!payment) throw new NotFoundException('payment not found')

            return payment;
        } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve payment');
    }
    }
}