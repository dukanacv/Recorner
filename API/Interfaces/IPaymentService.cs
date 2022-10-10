using System.Threading.Tasks;
using API.Models;
using API.Models.OrderAggregate;

namespace API.Interfaces
{
    public interface IPaymentService
    {
        public Task<Cart> createOrUpdatePayment(string cartId);
        public Task<Order> UpdateOrderPaymentSucceeded(string paymentId);
        public Task<Order> UpdateOrderPaymentFailed(string paymentId);
    }
}