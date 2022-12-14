using System;
using System.Threading.Tasks;
using API.Models.Identity;
using API.Models.SeedData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();
                try
                {
                    var context = services.GetRequiredService<Db>();
                    await context.Database.MigrateAsync();
                    await DbContextSeed.SeedAsync(context, loggerFactory);

                    var userManager = services.GetRequiredService<UserManager<User>>();
                    var idContext = services.GetRequiredService<IdDbContext>();
                    await idContext.Database.MigrateAsync();
                    await IdDbContextSeed.SeedUsersAsync(userManager);
                }
                catch (Exception e)
                {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError(e, "Error occured during migration atempt");
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
