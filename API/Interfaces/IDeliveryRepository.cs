using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.OrderAggregate;

namespace API.Interfaces
{
    public interface IDeliveryRepository
    {
        public Task<Delivery> GetDeliveryByIdAsync(int id);
        public Task<List<Delivery>> GetDeliveriesAsync();
        //public Task<List<ProductBrand>> GetProductBrandsAsync();
    }
}