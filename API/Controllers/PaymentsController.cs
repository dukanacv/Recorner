using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
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
    }
}