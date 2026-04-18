namespace Portfolio.Api.Data;
public class ProjectCard : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set;} = string.Empty;
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string[] Authors { get; set; } = [];
    public string Href { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
}