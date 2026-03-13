import { CreateOrderRequestDto } from "../dto/request/create-order-request.dto";


export class CreateOrderModel {
    static fromDto(dto: CreateOrderRequestDto, userId: string): CreateOrderModel{
        const model = new CreateOrderModel();
        model.addressId = dto.addressId;
        model.userId = userId
        return model;
    }
    addressId: string;
    userId: string;
}