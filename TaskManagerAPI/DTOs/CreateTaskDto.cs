using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTOs
{
	public class CreateTaskDto
	{
		[Required(ErrorMessage = "Название задачи обязательно")]
		[StringLength(200, MinimumLength = 1, ErrorMessage = "Название должно быть от 1 до 200 символов")]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000, ErrorMessage = "Описание не должно превышать 1000 символов")]
		public string? Description { get; set; }
	}

	public class UpdateTaskDto
	{
		[Required(ErrorMessage = "Название задачи обязательно")]
		[StringLength(200, MinimumLength = 1, ErrorMessage = "Название должно быть от 1 до 200 символов")]
		public string Title { get; set; } = string.Empty;

		[StringLength(1000, ErrorMessage = "Описание не должно превышать 1000 символов")]
		public string? Description { get; set; }

		public bool IsCompleted { get; set; }
	}

	public class TaskFilterDto
	{
		public string? Status { get; set; }
	}
}