using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var address = orderDto.ShippingAddress;

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryId, orderDto.CartId, address);

            if (order == null)
            {
                return BadRequest("Problem pri kreiranju narudzbine. Probajte ponovo.");
            }

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrdersForUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(orders);
        }

        [HttpGet("deliveries")]
        public async Task<ActionResult<List<Order>>> GetDeliveries()
        {
            return Ok(await _orderService.GetDeliveriesAsync());
        }
    }
}