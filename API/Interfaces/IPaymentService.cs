using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IPaymentService
    {
        public Task<Cart> createOrUpdatePayment(string cartId);
    }
}