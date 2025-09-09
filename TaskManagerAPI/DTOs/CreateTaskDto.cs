using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTOs
{
	/// <summary>
	/// DTO для створення нового завдання.
	/// </summary>
	public class CreateTaskDto
	{
		[Required(ErrorMessage = "Назва завдання обов'язково")]
		[StringLength(200, MinimumLength = 1, ErrorMessage = "Назва повинна містити від 1 до 200 символів")]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000, ErrorMessage = "Опис не повинен перевищувати 1000 символів")]
		public string? Description { get; set; }
	}
	/// <summary>
	/// DTO для оновлення існуючого завдання.
	/// </summary>
	public class UpdateTaskDto
	{
		[Required(ErrorMessage = "Назва завдання обов'язково")]
		[StringLength(200, MinimumLength = 1, ErrorMessage = "Назва повинна містити від 1 до 200 символів")]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000, ErrorMessage = "Опис не повинен перевищувати 1000 символів")]
		public string? Description { get; set; }

		public bool IsCompleted { get; set; }
	}

	/// <summary>
	/// DTO для передачі параметрів фільтрації.
	/// </summary>
	public class TaskFilterDto
	{
		// Статус для фільтрації ("all", "active", "completed").
		public string? Status { get; set; }
	}
}