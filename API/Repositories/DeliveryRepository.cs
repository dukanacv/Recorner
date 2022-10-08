using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class DeliveryRepository : IDeliveryRepository
    {
        private readonly Db _db;
        public DeliveryRepository(Db db)
        {
            _db = db;
        }

        public async Task<List<Delivery>> GetDeliveriesAsync()
        {
            return await _db.Deliveries.ToListAsync();
        }

        public async Task<Delivery> GetDeliveryByIdAsync(int id)
        {
            return await _db.Deliveries.FindAsync(id);
        }
    }
}