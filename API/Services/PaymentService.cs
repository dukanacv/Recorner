using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using API.Models.OrderAggregate;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IConfiguration _config;
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly Db _db;
        public PaymentService(Db db, IOrderRepository orderRepository, ICartRepository cartRepository, IConfiguration config,
        IDeliveryRepository deliveryRepository, IProductRepository productRepository)
        {
            _db = db;
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _deliveryRepository = deliveryRepository;
            _config = config;
            _cartRepository = cartRepository;
        }

        public async Task<Cart> createOrUpdatePayment(string cartId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var cart = await _cartRepository.GetCartAsync(cartId);

            var shippingPrice = 0;

            if (cart.DeliveryId.HasValue)
            {
                var delivery = await _deliveryRepository.GetDeliveryByIdAsync((int)cart.DeliveryId);

                shippingPrice = delivery.Price;
            }

            foreach (var item in cart.Items)
            {
                var productItem = await _productRepository.GetProductByIdAsync(item.Id);

                if (item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            var stripeService = new PaymentIntentService();

            PaymentIntent intent;

            if (string.IsNullOrEmpty(cart.PaymentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = cart.Items.Sum(i => i.Quantity * (i.Price * 100) + shippingPrice * 100),
                    Currency = "EUR",
                    PaymentMethodTypes = new List<string> { "card" }
                };

                intent = await stripeService.CreateAsync(options);

                cart.PaymentId = intent.Id;

                cart.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = cart.Items.Sum(i => i.Quantity * (i.Price) + shippingPrice)
                };

                await stripeService.UpdateAsync(cart.PaymentId, options);
            }

            await _cartRepository.UpdateCartAsync(cart);

            return cart;
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentId)
        {
            var order = await _orderRepository.GetOrderByPaymentIntentId(paymentId);

            if (order == null)
            {
                return null;
            }

            order.Status = OrderStatus.PlacanjeNijeUspelo;

            await _db.SaveChangesAsync();

            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentId)
        {
            var order = await _orderRepository.GetOrderByPaymentIntentId(paymentId);

            if (order == null)
            {
                return null;
            }

            order.Status = OrderStatus.UspesnoPlacanje;

            //update order

            //save chagnes async

            return order;
        }
    }
}