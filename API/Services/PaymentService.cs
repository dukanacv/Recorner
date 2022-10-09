using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
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
        public PaymentService(ICartRepository cartRepository, IConfiguration config,
        IDeliveryRepository deliveryRepository, IProductRepository productRepository)
        {
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
                    Currency = "eur",
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
                    Amount = cart.Items.Sum(i => i.Quantity * (i.Price * 100) + shippingPrice * 100)
                };

                await stripeService.UpdateAsync(cart.PaymentId, options);
            }

            await _cartRepository.UpdateCartAsync(cart);

            return cart;
        }
    }
}