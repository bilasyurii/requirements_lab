using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.PoorWords;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PoorWordsController : ControllerBase
    {
        private readonly IPoorWordsService pwService;

        public PoorWordsController(IPoorWordsService pwService)
        {
            this.pwService = pwService;
        }

        [HttpPost]
        [Route("Check/")]
        public PoorWordsResultDTO CheckPoorWords([FromBody] PoorWordsRequestDTO poorWords)
        {
            return pwService.CheckPoorWords(poorWords);
        }

        [HttpGet]
        [Route("GetRequirementsForPWTask/")]
        public RequirementsForPWTaskDTO GetRequirements()
        {
            return pwService.GetRequirements();
        }
    }
}
