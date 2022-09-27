using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}