using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.OrderAggregate;

namespace API.Interfaces
{
    public interface IOrderRepository
    {

        public Task<Order> GetOrderByPaymentIntentId(string paymentId);
        public void DeleteOrder(int orderId);
    }
}