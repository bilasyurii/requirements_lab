using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Requirements;
using RequirementsLab.DAL;

namespace RequirementsLab.Services
{
    public class RequirementsService : IRequirementsService
    {
        private readonly RequirementsLabContext context;

        public RequirementsService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public RequirementsTaskDTO GetTask(int id)
        {
            var task = context.Tasks.Find(id);

            return new RequirementsTaskDTO
            {
                Id = task.Id,
                Description = task.Description,
            };
        }
    }
}
