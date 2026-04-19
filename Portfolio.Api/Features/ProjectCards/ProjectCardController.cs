using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Features.ProjectCards;

namespace Portfolio.Api.Features.ProjectCards;

[ApiController]
[Route("api/[controller]")]
public class ProjectCardController : ControllerBase
{
    private readonly IProjectCardService _projectCardService;

    public ProjectCardController(IProjectCardService projectCardService)
    {
        _projectCardService = projectCardService;
    }

    [HttpGet("projects")]
    public async Task<IActionResult> GetProjects([FromQuery] string type)
    {
        if (string.IsNullOrWhiteSpace(type))
        {
            return BadRequest(new { message = "Query parameter 'type' is required. Use: swe, ai-ml, or cs." });
        }

        try
        {
            var projects = await _projectCardService.GetProjectsByTypeAsync(type);
            return Ok(projects);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}