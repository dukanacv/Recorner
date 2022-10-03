using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface ICartRepository
    {
        public Task<Cart> GetCartAsync(string cartId);
        public Task<Cart> UpdateCartAsync(Cart cart);
        public Task<bool> DeleteCartAsync(string cartId);
    }
}