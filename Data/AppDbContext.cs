using APPCDA.Models;
using Microsoft.EntityFrameworkCore;

namespace APPCDA.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Article> Article { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<Commande> Commande { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<Commande>()
                .HasKey(c => c.IdCommande);

            // Add other configurations as needed...

            base.OnModelCreating(modelBuilder);
        }
    }
}
