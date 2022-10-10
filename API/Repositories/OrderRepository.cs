using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly Db _db;
        public OrderRepository(Db db)
        {
            _db = db;
        }

        public async void DeleteOrder(int orderId)
        {
            var order = await _db.Orders.FindAsync(orderId);

            _db.Orders.Remove(order);
        }

        public async Task<Order> GetOrderByPaymentIntentId(string paymentId)
        {
            return await _db.Orders.SingleOrDefaultAsync(o => o.PaymentIntentId.Equals(paymentId));
        }
    }
}