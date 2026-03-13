import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guards";
import { PaymentsService } from "./payments.service";
import { CreatePaymentRequestDto } from "./dto/request/create-payment-request.dto";
import { PaymentResponseDto } from "./dto/response/payment-response.dto";
import { CreatePaymentModel } from "./models/create-payment.model";

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}
 
  @Post()
  @ApiOperation({ summary: 'Create payment for an order' })
  async create(@Body() dto: CreatePaymentRequestDto): Promise<PaymentResponseDto> {
    const model = CreatePaymentModel.fromDto(dto);
    const result = await this.paymentService.create(model);
    return PaymentResponseDto.fromModel(result);
  }
 
  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payment by order ID' })
  async findByOrder(@Param('orderId') orderId: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.findByOrder(orderId);
    return PaymentResponseDto.fromModel(payment);
  }
}