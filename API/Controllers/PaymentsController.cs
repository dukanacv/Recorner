using System;
using System.IO;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using API.Models.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private const string WhSecret = "whsec_29f33cec6dac2351fefcf9edf4531904926f86de95da7aa4a4dd0bc58a432d9c";
        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("{cartId}")]
        [Authorize]
        public async Task<ActionResult<Cart>> CreateOrUpdatePayment(string cartId)
        {
            var cart = await _paymentService.createOrUpdatePayment(cartId);

            if (cart == null)
            {
                return BadRequest("Postoji problem sa korpom.");
            }

            return cart;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook(string cartId)
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WhSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    Console.WriteLine("succeeded: ", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    break;
                case "payment_intentpayment.failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    Console.WriteLine("failed: ", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}