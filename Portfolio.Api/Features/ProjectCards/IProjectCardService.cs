using Portfolio.Api.Data;

namespace Portfolio.Api.Features.ProjectCards;

public interface IProjectCardService
{
	Task<IReadOnlyList<ProjectCard>> GetProjectsByTypeAsync(string type);
}