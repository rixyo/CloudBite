/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

class OrderItemInput {
  itemId: string;
  quantity: number;
  price: string;
  itemName: string;
  restaurantId: string;
}


export class CreateOrderInput {
  orderItems: OrderItemInput[];
 
}
export class OrderItem {
    id: string;
    order: Order;
    menu_item_id: string;
    quantity: number;

}
export class Order {
    id: string;
    restaurantId: string;
    userId: string;
    orderItems: OrderItem[];
    payment_status: string;
    total: string;
    delivery_status: string;
    phone: string;
    address: string;
    
}
class createOrderResponse {
  id: string;
  url: string;
}


export abstract class IMutation {
  abstract createOrder(
    createOrderInput: CreateOrderInput,
  ): Nullable<createOrderResponse> | Promise<Nullable<createOrderResponse>>;
}

export abstract class IQuery {
  abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;

  abstract orders(): Nullable<Order[]> | Promise<Nullable<Order[]>>;
}

type Nullable<T> = T | null;
