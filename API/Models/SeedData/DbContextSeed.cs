using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace API.Models.SeedData
{
    public class DbContextSeed
    {
        public static async Task SeedAsync(Db db, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!db.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText("../API/Models/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (var brand in brands)
                    {
                        db.ProductBrands.Add(brand);
                    }

                    await db.SaveChangesAsync();
                }

                if (!db.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("../API/Models/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var type in types)
                    {
                        db.ProductTypes.Add(type);
                    }

                    await db.SaveChangesAsync();
                }

                if (!db.Products.Any())
                {
                    var productsData = File.ReadAllText("../API/Models/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var product in products)
                    {
                        db.Products.Add(product);
                    }

                    await db.SaveChangesAsync();
                }
            }
            catch (System.Exception e)
            {
                var logger = loggerFactory.CreateLogger<DbContextSeed>();
                logger.LogError(e.Message);
            }
        }
    }
}