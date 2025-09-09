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

		[HttpGet("{id}")]
		public async Task<ActionResult<TaskItem>> GetTask(int id)
		{
			var task = await _context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound(new { message = $"Задача с ID {id} не найдена" });
			}

			return Ok(task);
		}

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
				return NotFound(new { message = $"Задача с ID {id} не найдена" });
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

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTask(int id)
		{
			var task = await _context.Tasks.FindAsync(id);

			if (task == null)
			{
				return NotFound(new { message = $"Задача с ID {id} не найдена" });
			}

			_context.Tasks.Remove(task);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Задача успешно удалена" });
		}

		private bool TaskExists(int id)
		{
			return _context.Tasks.Any(e => e.Id == id);
		}
	}
}