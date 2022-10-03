using System;
using System.Text.Json;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using StackExchange.Redis;

namespace API.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly IDatabase _db;//setting up to use redis db

        public CartRepository(IConnectionMultiplexer redis)
        {
            _db = redis.GetDatabase();
        }

        public async Task<bool> DeleteCartAsync(string cartId)
        {
            return await _db.KeyDeleteAsync(cartId);
        }

        public async Task<Cart> GetCartAsync(string cartId)
        {
            var data = await _db.StringGetAsync(cartId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<Cart>(data);
        }

        public async Task<Cart> UpdateCartAsync(Cart cart)
        {
            var created = await _db.
                StringSetAsync(cart.Id, JsonSerializer.Serialize(cart), TimeSpan.FromDays(7));

            if (!created)
            {
                return null;
            }

            return await GetCartAsync(cart.Id);

        }
    }
}