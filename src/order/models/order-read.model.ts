import { PaymentStatus } from "../../payments/enums/payments.enum";
import { OrderStatus } from "../enums/order.enum";

interface PrismaOrderProduct {
  id: string;
  name: string;
  price: number;
}

interface PrismaOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  product: PrismaOrderProduct;
}

interface PrismaOrderAddress {
  id: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
}

interface PrismaOrderPayment {
  id: string;
  status: string;
  amount: number;
  method: string | null;
}

interface PrismaOrder {
  id: string;
  userId: string;
  addressId: string;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items: PrismaOrderItem[];
  address: PrismaOrderAddress;
  payment: PrismaOrderPayment | null;
}

export class OrderItemModel {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: { id: string; name: string; price: number };
}

export class OrderAddressModel {
  id: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
}

export class OrderPaymentModel {
  id: string;
  status: PaymentStatus;
  amount: number;
  method: string | null;
}

export class OrderReadModel {
  static fromPrisma(data: PrismaOrder): OrderReadModel {
    const model = new OrderReadModel();
    model.id = data.id;
    model.userId = data.userId;
    model.addressId = data.addressId;
    model.status = data.status as OrderStatus;
    model.total = data.total;
    model.items = data.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      product: { id: item.product.id, name: item.product.name, price: item.product.price },
    }));
    model.address = {
      id: data.address.id,
      street1: data.address.street1,
      street2: data.address.street2,
      city: data.address.city,
      state: data.address.state,
      postalCode: data.address.postalCode,
      country: data.address.country,
    };
    model.payment = data.payment
      ? {
          id: data.payment.id,
          status: data.payment.status as PaymentStatus,
          amount: data.payment.amount,
          method: data.payment.method,
        }
      : null;
    model.createdAt = data.createdAt;
    return model;
  }

  id: string;
  userId: string;
  addressId: string;
  status: OrderStatus;
  total: number;
  items: OrderItemModel[];
  address: OrderAddressModel;
  payment: OrderPaymentModel | null;
  createdAt: Date;
}