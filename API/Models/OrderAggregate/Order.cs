using System;
using System.Collections.Generic;

namespace API.Models.OrderAggregate
{
    public class Order
    {
        public Order()
        {
        }

        public Order(List<OrderItem> orderItems, string byerEmail, Address shippingAddress, Delivery delivery, int subtotal,
        string paymentIntentId)
        {
            ByerEmail = byerEmail;
            ShippingAddress = shippingAddress;
            Delivery = delivery;
            OrderItems = orderItems;
            Subtotal = subtotal;
            PaymentIntentId = paymentIntentId;
        }

        public int Id { get; set; }
        public string ByerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public Address ShippingAddress { get; set; }
        public Delivery Delivery { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public int Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.NaCekanju;
        public string PaymentIntentId { get; set; }

        public int GetTotal()
        {
            return Subtotal + Delivery.Price;
        }
    }
}