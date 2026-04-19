using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;

namespace Portfolio.Api.Features.ProjectCards;

public class ProjectCardService : IProjectCardService
{
	private static readonly Dictionary<string, string> TypeCategoryMap = new(StringComparer.OrdinalIgnoreCase)
	{
		["swe"] = "swe",
		["ai-ml"] = "ai-ml",
		["cs"] = "cs"
	};

	private readonly AppDbContext _dbContext;

	public ProjectCardService(AppDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<IReadOnlyList<ProjectCard>> GetProjectsByTypeAsync(string type)
	{
		var normalizedType = type.Trim();

		if (!TypeCategoryMap.TryGetValue(normalizedType, out var category))
		{
			throw new ArgumentException("Query type must be one of: swe, ai-ml, cs.", nameof(type));
		}

		return await _dbContext.ProjectCards
			.AsNoTracking()
			.Where(project => project.Category == category)
			.OrderByDescending(project => project.CreatedAtUtc)
			.ToListAsync();
	}
}
