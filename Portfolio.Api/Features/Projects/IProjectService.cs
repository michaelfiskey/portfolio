using Portfolio.Api.Data;
namespace Portfolio.Api.Features.Projects;

public interface IProjectService
{
	Task<IReadOnlyList<Project>> GetProjectsByTypeAsync(string type);
}