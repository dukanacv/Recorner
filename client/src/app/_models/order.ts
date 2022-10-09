import { Address } from "cluster"

export interface IOrderToCreate {
    cartId: string
    deliveryId: number
    shippingAddress: Address
}



export interface Delivery {
    id: number;
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
}

export interface ItemOrdered {
    productItemId: number;
    productName: string;
    pictureUrl: string;
}

export interface OrderItem {
    id: number;
    itemOrdered: ItemOrdered;
    price: number;
    quantity: number;
}

export interface IOrder {
    id: number;
    byerEmail: string;
    orderDate: string;
    shippingAddress: Address;
    delivery: Delivery;
    orderItems: OrderItem[];
    subtotal: number;
    status: number;
    paymentIntentId?: any;
}
