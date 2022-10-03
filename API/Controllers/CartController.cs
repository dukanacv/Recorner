using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Cart>> GetCartById([FromQuery] string cartId)
        {
            var cart = await _cartRepository.GetCartAsync(cartId);

            return Ok(cart ?? new Cart(cartId));
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> UpdateCart(Cart cart)
        {
            var updatedCart = await _cartRepository.UpdateCartAsync(cart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteCart(string cartId)
        {
            await _cartRepository.DeleteCartAsync(cartId);
        }
    }
}