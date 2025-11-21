using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using TaskApi.Dtos;
using TaskApi.Repositories;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _repo;

        public TasksController(ITaskRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _repo.GetAllAsync());

        [HttpPost]
        public async Task<IActionResult> Create(TaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                DueDate = dto.DueDate,
                Status = dto.Status
            };

            await _repo.AddAsync(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskDto dto)
        {
            var task = await _repo.GetByIdAsync(id);
            if (task == null) return NotFound();

            task.Title = dto.Title;
            task.DueDate = dto.DueDate;
            task.Status = dto.Status;

            await _repo.UpdateAsync(task);
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return Ok("Deleted");
        }
    }
}
