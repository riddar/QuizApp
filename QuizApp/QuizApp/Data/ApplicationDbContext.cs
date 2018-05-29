using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Score> Scores { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Alternative> Alternatives { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<Score>().HasKey(h => h.Id);
            builder.Entity<Score>().HasOne(s => s.Question).WithMany(q => q.Scores);
            builder.Entity<Score>().HasOne(s => s.User).WithMany(u => u.Scores);

            builder.Entity<Question>().HasKey(q => q.Id);
            builder.Entity<Question>().HasMany(q => q.Scores).WithOne(s => s.Question);
            builder.Entity<Question>().HasMany(q => q.Alternatives).WithOne(a => a.Question);

            builder.Entity<Alternative>().HasKey(a => a.Id);
            builder.Entity<Alternative>().HasOne(a => a.Question).WithMany(q => q.Alternatives);
        }
    }
}
