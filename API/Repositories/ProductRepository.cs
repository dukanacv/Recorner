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

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _db.Products.FindAsync(id);
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _db.Products.ToListAsync();
        }
    }
}