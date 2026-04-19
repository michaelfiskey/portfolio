using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Features.Projects;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetProjects([FromQuery] string type)
    {
        if (string.IsNullOrWhiteSpace(type))
        {
            return BadRequest(new { message = "Query parameter 'type' is required. Use: swe, ai-ml, or cs." });
        }

        try
        {
            var projects = await _projectService.GetProjectsByTypeAsync(type);
            return Ok(projects);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}