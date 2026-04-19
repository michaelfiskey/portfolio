namespace Portfolio.Api.Data;
public class Project : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set;} = string.Empty;
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string[] Authors { get; set; } = [];
    public string Href { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
    public string Category { get; set; } = string.Empty;
}