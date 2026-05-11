using Portfolio.Api.Data;
namespace Portfolio.Api.Features.Projects;

public interface IProjectService
{
	Task<IReadOnlyList<ProjectEntity>> GetProjectsByTypeAsync(string type);
}