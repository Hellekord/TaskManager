
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}

		public DbSet<TaskItem> Tasks { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<TaskItem>()
				.Property(t => t.Title)
				.IsRequired()
				.HasMaxLength(200);

			modelBuilder.Entity<TaskItem>()
				.Property(t => t.Description)
				.HasMaxLength(1000);
			modelBuilder.Entity<TaskItem>().HasData(
				new TaskItem
				{
					Id = 1,
					Title = "Изучить ASP.NET Core",
					Description = "Пройти основы Web API",
					IsCompleted = false,
					CreatedAt = DateTime.UtcNow
				},
				new TaskItem
				{
					Id = 2,
					Title = "Создать первый API",
					Description = "Реализовать CRUD операции",
					IsCompleted = false,
					CreatedAt = DateTime.UtcNow
				}
			);
		}
	}
}