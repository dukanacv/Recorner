using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class OrderService : IOrderService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly Db _db;
        private readonly IOrderRepository _orderRepository;
        private readonly IPaymentService _paymentService;
        public OrderService(ICartRepository cartRepository, IProductRepository productRepository, IDeliveryRepository deliveryRepository, Db db, IOrderRepository orderRepository, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _orderRepository = orderRepository;
            _db = db;
            _deliveryRepository = deliveryRepository;
            _productRepository = productRepository;
            _cartRepository = cartRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryId, string cartId, Address shippingAddress)
        {
            var cart = await _cartRepository.GetCartAsync(cartId);

            var items = new List<OrderItem>();
            foreach (var item in cart.Items)
            {
                var productItem = await _productRepository.GetProductByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var delivery = await _deliveryRepository.GetDeliveryByIdAsync(deliveryId);

            var subtotal = items.Sum(item => item.Price * item.Quantity);

            //check if order exists
            var existingOrder = _orderRepository.GetOrderByPaymentIntentId(cart.PaymentId);

            if (existingOrder != null)
            {
                _orderRepository.DeleteOrder(existingOrder.Id);
                await _paymentService.createOrUpdatePayment(cart.PaymentId);
            }


            var order = new Order(items, buyerEmail, shippingAddress, delivery, subtotal, cart.PaymentId);

            _db.Orders.Add(order);

            await _db.SaveChangesAsync();

            return order;
        }

        public async Task<List<Delivery>> GetDeliveriesAsync()
        {
            return await _deliveryRepository.GetDeliveriesAsync();
        }

        public Task<Order> GetOrderByIdAsync(int orderId, string buyerEmail)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var orders = await _db.Orders.Where(o => o.ByerEmail == buyerEmail)
                .Include(o => o.OrderItems)
                .Include(d => d.Delivery)
                .ToListAsync();

            return orders;
        }
    }
}