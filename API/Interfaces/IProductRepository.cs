using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        public Task<Product> GetProductByIdAsync(int id);
        public Task<List<Product>> GetProductsAsync();
        public Task<List<ProductBrand>> GetProductBrandsAsync();
        public Task<List<ProductType>> GetProductTypesAsync();
    }
}