using CaloriePunch.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CaloriePunch.Infrastructure.EF
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public AppDbContext(string connectionString)
        {
            if (String.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException(nameof(connectionString));

            var options = new DbContextOptionsBuilder();
            options.UseSqlServer(connectionString);

            base.OnConfiguring(options);
        }

        public virtual DbSet<CalorieEntry> CalorieEntries { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserGoal> UserGoals { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //DbConfigurator.AddConfigurations(builder);

            base.OnModelCreating(builder);
        }

    }
}
