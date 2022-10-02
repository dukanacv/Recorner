using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Middleware;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ProductsService
    {
        private readonly Db _db;
        public ProductsService(Db db)
        {
            _db = db;
        }

        public async Task<PaginatedList<Product>> GetProductsAndOrdering(string sort, string brandName, UserParmas userParmas,
        string search)
        {
            var products = from p in _db.Products select p;

            if (!String.IsNullOrEmpty(brandName))
            {
                products = products.Where(p => p.ProductBrand.Name.Equals(brandName));
            }

            if (!String.IsNullOrEmpty(search))
            {
                products = products.Where(p => p.Name.ToLower().Contains(search.ToLower()));
            }

            switch (sort)
            {
                case "priceAsc":
                    products = products.OrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    products = products.OrderByDescending(p => p.Price);
                    break;
                default:
                    products = products.OrderBy(p => p.Name);
                    break;
            }
            var query = products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)
                .AsNoTracking();

            return await PaginatedList<Product>.CreateAsync(query, userParmas.PageNumber, userParmas.PageSize);
        }
    }
}