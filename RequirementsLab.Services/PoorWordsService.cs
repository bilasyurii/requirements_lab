using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.PoorWords;
using RequirementsLab.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Services
{
    public class PoorWordsService : IPoorWordsService
    {
        private readonly RequirementsLabContext context;

        public PoorWordsService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public PoorWordsResultDTO CheckPoorWords(PoorWordsRequestDTO poorWords)
        {
            var requirementIDs = poorWords.requirementIDs;
            var pwArray = poorWords.poorWords;

            var poorWordsFromDB = context.PoorWords
                .Where(pw => requirementIDs.Contains(pw.RequirementId)) 
                .Select(pw => new PoorWordDTO
                {
                    Text = pw.Text,
                })
                .Distinct()
                .ToList();

            var poorWordsMatched = context.PoorWords
                .Where(pw => requirementIDs.Contains(pw.RequirementId))
                .Where(pw => pwArray.Contains(pw.Text))
                .Select(pw => new PoorWordDTO
                {
                    Text = pw.Text,
                })
                .Distinct()
                .ToList();

            int grade = (int)(((float)poorWordsMatched.Count / poorWordsFromDB.Count) * 100);
            int notMatchedCount = pwArray.Count - poorWordsMatched.Count;
            grade -= grade / pwArray.Count * notMatchedCount;
            string resultTitle;
            if (grade < 33)
            {
                resultTitle = "bad result";
            }
            else if(grade>=33 && grade< 66)
            {
                resultTitle = "normal result";
            }
            else
            {
                resultTitle = "excellent result";
            }
            /*
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
            */
            return new PoorWordsResultDTO
            {
                Grade = grade,
                NotMatched = notMatchedCount,
                Title = resultTitle,
            };
        }

        public RequirementsForPWTaskDTO GetRequirements()
        {
            var tasks = context.RequirementsForPWTask
               .Select(requirement => new RequirementForPWTaskDTO
               {
                   Id = requirement.Id,
                   Title = requirement.Title,
               })
               .ToList();

            return new RequirementsForPWTaskDTO
            {
                Requirements = tasks
            };
        }
    }
}
