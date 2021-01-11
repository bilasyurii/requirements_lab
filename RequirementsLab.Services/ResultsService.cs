using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.Entities;
using RequirementsLab.DAL;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace RequirementsLab.Services
{
    public class ResultsService : IResultsService
    {
        private readonly RequirementsLabContext context;

        public ResultsService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public void StoreResult(int taskId, int grade, int userId)
        {
            var user = context.Users.Find(userId);
            var task = context.Tasks.Find(taskId);
            var taskTypeId = task.TaskTypeId;

            int diff;
            
            try
            {
                TaskResultRecord bestResult = context.TaskResultRecords
                    .AsQueryable()
                    .Include(record => record.Task)
                    .Where(record => record.Task.TaskTypeId == taskTypeId)
                    .OrderByDescending(record => record.Grade)
                    .First();

                diff = grade - bestResult.Grade;
            }
            catch (Exception)
            {
                diff = grade;
            }

            if (diff > 0)
            {
                diff *= task.Difficulty;

                user.Level += diff * 0.1f;

                context.Entry(user).CurrentValues.SetValues(user);
            }

            var record = new TaskResultRecord
            {
                Grade = grade,
                TaskId = taskId,
                Time = DateTime.Now,
                UserId = userId,
            };

            context.TaskResultRecords.Add(record);

            context.SaveChanges();
        }
    }
}
