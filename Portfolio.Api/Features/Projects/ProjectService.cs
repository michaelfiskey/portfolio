using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Constants;
namespace Portfolio.Api.Features.Projects;

public class ProjectService : IProjectService
{
    private static readonly Dictionary<string, string> TypeCategoryMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["swe"] = "swe",
        ["ai-ml"] = "ai-ml",
        ["cs"] = "cs"
    };

    private readonly AppDbContext _dbContext;

    public ProjectService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<ProjectEntity>> GetProjectsByTypeAsync(string type)
    {
        var normalizedType = type.Trim();

        if (!TypeCategoryMap.TryGetValue(normalizedType, out var category))
        {
            throw new ArgumentException(ErrorConstants.Projects.InvalidProjectQuery, nameof(type));
        }

        return await _dbContext.Projects
            .AsNoTracking()
            .Where(project => project.Category == category)
            .OrderByDescending(project => project.CreatedAtUtc)
            .ToListAsync();
    }
}
