using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TasksController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public TasksController(ApplicationDbContext context)
		{
			_context = context;
		}


		/// <summary>
		/// HTTP GET: /api/tasks
		/// Отримує список завдань з можливістю фільтрації за статусом.
		/// </summary>
		/// <param name="status">Параметр запиту для фільтрації ("all", "active", "completed"). За замовчуванням "all".</param>
		/// <returns>Список завдань.</returns>
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks([FromQuery] string? status = "all")
		{
			var query = _context.Tasks.AsQueryable();

			switch (status?.ToLower())
			{
				case "active":
					query = query.Where(t => !t.IsCompleted);
					break;
				case "completed":
					query = query.Where(t => t.IsCompleted);
					break;
				case "all":
				default:
					break;
			}

			var tasks = await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
			return Ok(tasks);
		}

		/// <summary>
		/// HTTP GET: /api/tasks/{id}
		/// Отримує одне конкретне завдання за його ідентифікатором (ID).
		/// </summary>
		/// <param name="id">Ідентифікатор завдання.</param>
		/// <returns>Знайдене завдання або помилку 404 Not Found.</returns>
		[HttpGet("{id}")]
		public async Task<ActionResult<TaskItem>> GetTask(int id)
		{
			var task = await _context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound(new { message = $"Завдання з ID {id} не знайдено" });
			}

			return Ok(task);
		}

		/// <summary>
		/// HTTP POST: /api/tasks
		/// Створює нове завдання.
		/// </summary>
		/// <param name="createTaskDto">Дані для створення завдання, отримані з тіла запиту.</param>
		/// <returns>Створене завдання.</returns>
		[HttpPost]
		public async Task<ActionResult<TaskItem>> CreateTask(CreateTaskDto createTaskDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var task = new TaskItem
			{
				Title = createTaskDto.Title,
				Description = createTaskDto.Description,
				IsCompleted = false,
				CreatedAt = DateTime.UtcNow
			};

			_context.Tasks.Add(task);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
		}

		/// <summary>
		/// HTTP PUT: /api/tasks/{id}
		/// Оновлює існуюче завдання.
		/// </summary>
		/// <param name="id">Ідентифікатор завдання, яке потрібно оновити.</param>
		/// <param name="updateTaskDto">Нові дані для завдання.</param>
		/// <returns>Оновлене завдання або код помилки.</returns>
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto updateTaskDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var task = await _context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound(new { message = $"Завдання з ID {id} не знайдено" });
			}

			task.Title = updateTaskDto.Title;
			task.Description = updateTaskDto.Description;

			if (updateTaskDto.IsCompleted && !task.IsCompleted)
			{
				task.CompletedAt = DateTime.UtcNow;
			}
			else if (!updateTaskDto.IsCompleted && task.IsCompleted)
			{
				task.CompletedAt = null;
			}

			task.IsCompleted = updateTaskDto.IsCompleted;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TaskExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Ok(task);
		}

		/// <summary>
		/// HTTP DELETE: /api/tasks/{id}
		/// Видаляє завдання за його ідентифікатором.
		/// </summary>
		/// <param name="id">Ідентифікатор завдання для видалення.</param>
		/// <returns>Повідомлення про успішне видалення або код помилки.</returns>
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTask(int id)
		{
			var task = await _context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound(new { message = $"Завдання з ID {id} не знайдено" });
			}

			_context.Tasks.Remove(task);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Завдання успішно видалено" });
		}

		private bool TaskExists(int id)
		{
			return _context.Tasks.Any(e => e.Id == id);
		}
	}
}