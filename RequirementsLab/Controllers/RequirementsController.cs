using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Requirements;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RequirementsController : ControllerBase
    {
        private readonly IRequirementsService requirementsService;

        public RequirementsController(IRequirementsService requirementsService)
        {
            this.requirementsService = requirementsService;
        }

        [HttpGet]
        [Route("GetTask/{id}")]
        public RequirementsTaskDTO GetTask([FromRoute] int id)
        {
            return requirementsService.GetTask(id);
        }

        [HttpPost]
        [Route("Check")]
        public RequirementsResultDTO GetTask([FromBody] RequirementsAnswersDTO answers)
        {
            return requirementsService.Check(answers);
        }
    }
}
