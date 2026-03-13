import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "../common/database/order/repositories/order.repository";
import { CreateOrderModel } from "./models/create-order.model";
import { OrderReadModel } from "./models/order-read.model";

@Injectable()
export class OrderService{
    constructor(private readonly orderRepository: OrderRepository){}

    async create(model: CreateOrderModel): Promise<OrderReadModel>{
        try {
            return await this.orderRepository.create(model)
        } catch (error) {
          if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create order');
    }   
  }

  async findByUser(userId: string): Promise<OrderReadModel[]>{
    try {
        return await this.orderRepository.findByUser(userId)
    } catch (error) { throw new InternalServerErrorException('Failed to retrieve orders'); }
  }

  async findById(id: string): Promise<OrderReadModel>{
    try {
        const order = await this.orderRepository.findById(id);
        if(!order) throw new NotFoundException('Order not found')
            return order;
    } catch (error) {
      console.log("order error ?:", error);
      
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve order');
    }
  }
  
}
