import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BaseRepository, IQueryOptions } from "../../base.repository";
import { PrismaService } from "../../prisma.service";
import { CreateOrderModel } from "../../../../order/models/create-order.model";
import { OrderReadModel } from "../../../../order/models/order-read.model";


const orderInclude = {
  items: { include: { product: { select: { id: true, name: true, price: true } } } },
  address: true,
  payment: true,
};

@Injectable()
export class OrderRepository extends BaseRepository{
    constructor(prisma: PrismaService){
        super(prisma)
    }

    async create(model: CreateOrderModel, options?: IQueryOptions): Promise<OrderReadModel>{
        const {db} = this.parseOptions(options)

        const cart = await db.cart.findUnique({
            where:{userId: model.userId},
            include: {items: {include: {product: true} } },
        })

        if(!cart || cart.items.length === 0){
            throw new NotFoundException('Cart is empty')
        }

        const total = cart.items.reduce((sum, item)=> sum + item.product.price * item.quantity, 0)

        try {
            const order = await db.order.create({
                data: {
                    userId: model.userId,
                    addressId: model.addressId,
                    total,
                    items: {
                        create: cart.items.map((item)=>({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price,
                        }))
                    },
                },
                include: orderInclude
            })
            
            await db.cartItem.deleteMany({where: {cartId: cart.id}})

            return OrderReadModel.fromPrisma(order)
        } catch (error) {
      throw new InternalServerErrorException('Failed to create order', {
        cause: new Error(`Error creating order: ${(error as Error).message}`),
      });
    }
    }

    async findByUser(userId: string, options?: IQueryOptions): Promise<OrderReadModel[]>{
        const {db} = this.parseOptions(options)

        const orders = await db.order.findMany({
            where:{userId},
            include: orderInclude,
            orderBy: {createdAt: 'desc'},
        })
        
        return orders.map((o)=> OrderReadModel.fromPrisma(o))
    }

    async findById(id: string, options?: IQueryOptions): Promise<OrderReadModel | null>{
        const {db} = this.parseOptions(options)

        const order = await db.order.findUnique({where: {id}, include: orderInclude })
        return order ? OrderReadModel.fromPrisma(order) : null
    }
}