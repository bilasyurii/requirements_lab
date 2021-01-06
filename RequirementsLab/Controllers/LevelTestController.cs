using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Test;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LevelTestController : ControllerBase
    {
        private readonly ILevelTestService levelTestService;

        public LevelTestController(ILevelTestService levelTestService)
        {
            this.levelTestService = levelTestService;
        }

        [HttpGet]
        [Route("Generate/")]
        public TestDTO Generate()
        {
            return levelTestService.Generate();
        }

        [HttpPost]
        [Route("Check/")]
        public TestResultDTO Check([FromBody] TestAnswersDTO answers)
        {
            return levelTestService.Check(answers);
        }
    }
}
