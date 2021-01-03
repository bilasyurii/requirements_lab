using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Tasks;
using RequirementsLab.DAL;
using System.Collections.Generic;
using System.Linq;

namespace RequirementsLab.Services
{
    public class TaskService : ITaskService
    {
        private readonly RequirementsLabContext context;

        public TaskService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public TasksListDTO GetTasks()
        {
            var taskTypes = context.TaskTypes
                .Select(type => type.Name)
                .ToList();

            var tasks = context.Tasks
                .Include(task => task.TaskType)
                .Select(task => new TaskDTO
                {
                    Id = task.Id,
                    Title = task.Title,
                    Difficulty = task.Difficulty,
                    TaskType = task.TaskType.Name,
                })
                .ToList();

            return new TasksListDTO
            {
                Tasks = tasks,
                TaskTypes = taskTypes,
            };
        }
    }
}
