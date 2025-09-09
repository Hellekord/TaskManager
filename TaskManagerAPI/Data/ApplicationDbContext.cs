
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

		//представляє таблицю "Tasks" у БД.
		public DbSet<TaskItem> Tasks { get; set; }

		// Налаштовуємо правила для таблиць
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<TaskItem>()
				.Property(t => t.Title)
				.IsRequired()
				.HasMaxLength(200);

			modelBuilder.Entity<TaskItem>()
				.Property(t => t.Description)
				.HasMaxLength(1000);

			// Додаємо початкові дані (seeding) в таблицю при створенні БД.
			modelBuilder.Entity<TaskItem>().HasData(
				new TaskItem
				{
					Id = 1,
					Title = "Вивчити ASP.NET Core",
					Description = "Пройти основи Web API",
					IsCompleted = false,
					CreatedAt = DateTime.UtcNow
				},
				new TaskItem
				{
					Id = 2,
					Title = "Створити перший API",
					Description = "Реалізувати CRUD операції",
					IsCompleted = false,
					CreatedAt = DateTime.UtcNow
				}
			);
		}
	}
}