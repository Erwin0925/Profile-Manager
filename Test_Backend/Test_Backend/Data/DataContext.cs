using Microsoft.EntityFrameworkCore;
using Test_Backend.Entity;

namespace Test_Backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Users = Set<Users>();
        }

        public DbSet<Users> Users { get; set; }
    }
}
