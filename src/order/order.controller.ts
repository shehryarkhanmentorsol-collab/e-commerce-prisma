import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guards";
import { OrderService } from "./order.service";
import { CreateOrderRequestDto } from "./dto/request/create-order-request.dto";
import { CurrentUser } from "../common/decorators/current-user.decorators";
import { OrderResponseDto } from "./dto/response/order-response.dto";
import { CreateOrderModel } from "./models/create-order.model";


@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('orders')

export class OrderCOntroller {
    constructor(private readonly orderService: OrderService){}

    @Post()
    @ApiOperation({summary: "Place an order from cart"})
    async create(@Body() dto: CreateOrderRequestDto, @CurrentUser() user: {id: string}): Promise<OrderResponseDto>{
        const model = CreateOrderModel.fromDto(dto, user.id)
        const order = await this.orderService.create(model)
        return OrderResponseDto.fromModel(order)
    }

    @Get()
    @ApiOperation({summary: "Get my order history"})
    async findAll(@CurrentUser() user: {id: string}): Promise<OrderResponseDto[]>{
        const orders = await this.orderService.findByUser(user.id)
        return orders.map((o) => OrderResponseDto.fromModel(o));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order details' })
    async findOne(@Param('id') id: string): Promise <OrderResponseDto> {
        const order = await this.orderService.findById(id);
        return OrderResponseDto.fromModel(order)
    }
}