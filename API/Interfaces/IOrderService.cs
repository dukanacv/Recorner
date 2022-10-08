using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.OrderAggregate;

namespace API.Interfaces
{
    public interface IOrderService
    {
        public Task<Order> CreateOrderAsync(string buyerEmail, int deliveryId, string cartId, Address ShippingAddress);
        public Task<List<Order>> GetOrdersForUserAsync(string buyerEmail);
        public Task<Order> GetOrderByIdAsync(int orderId, string buyerEmail);
        public Task<List<Delivery>> GetDeliveriesAsync();
    }
}