using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly Db _db;
        public ProductRepository(Db db)
        {
            _db = db;
        }

        public async Task<List<ProductBrand>> GetProductBrandsAsync()
        {
            return await _db.ProductBrands.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _db.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _db.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)
                .ToListAsync();
        }

        public Task<List<ProductType>> GetProductTypesAsync()
        {
            return _db.ProductTypes.ToListAsync();
        }
    }
}