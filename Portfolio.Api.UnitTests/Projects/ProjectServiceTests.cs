namespace Portfolio.Api.UnitTests.Projects;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Features.Projects;
using Portfolio.Api.Data;

public class ProjectServiceTests
{
    private static AppDbContext CreateInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetProjectsByTypeAsync_InvalidType_ThrowsArgumentException()
    {
        using var context = CreateInMemoryContext();
        var service = new ProjectService(context);

        await Assert.ThrowsAsync<ArgumentException>(() =>
            service.GetProjectsByTypeAsync("ds"));
    }
    [Fact]
    public async Task GetProjectsByTypeAsync_EmptyString_ThrowsArgumentException()
    {
        using var context = CreateInMemoryContext();
        var service = new ProjectService(context);
        
        await Assert.ThrowsAsync<ArgumentException>(() =>
            service.GetProjectsByTypeAsync(""));
    }
    [Fact]
    public async Task GetProjectsByTypeAsync_ValidType_ReturnsEmptyList()
    {
        using var context = CreateInMemoryContext();
        context.Projects.AddRange(
            new ProjectEntity { Title = "SWE Project", Category = "swe" },
            new ProjectEntity { Title = "AI Project", Category = "ai-ml"}
        );
        await context.SaveChangesAsync();

        var service = new ProjectService(context);
        var result = await service.GetProjectsByTypeAsync("cs");
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetProjectsByTypeAsync_ValidType_ReturnsOnlyMatchingProject()
    {
        using var context = CreateInMemoryContext();
        context.Projects.AddRange(
            new ProjectEntity { Title = "SWE Project", Category = "swe" },
            new ProjectEntity { Title = "AI Project", Category = "ai-ml" }
        );
        await context.SaveChangesAsync();

        var service = new ProjectService(context);
        var result = await service.GetProjectsByTypeAsync("swe");

        Assert.Single(result);
        Assert.Equal("SWE Project", result[0].Title);
    }

        [Fact]
    public async Task GetProjectsByTypeAsync_ValidTypeExtraWhitespace_ReturnsMatchingProjects()
    {
        using var context = CreateInMemoryContext();
        context.Projects.AddRange(
            new ProjectEntity { Title = "SWE Project", Category = "swe" },
            new ProjectEntity { Title = "AI Project", Category = "ai-ml" }
        );
        await context.SaveChangesAsync();

        var service = new ProjectService(context);
        var result = await service.GetProjectsByTypeAsync("  swe  ");

        Assert.Single(result);
        Assert.Equal("SWE Project", result[0].Title);
    }

    [Fact]
    public async Task GetProjectsByTypeAsync_ValidTypeCapitalization_ReturnsMatchingProjects()
    {
        using var context = CreateInMemoryContext();
        context.Projects.AddRange(
            new ProjectEntity { Title = "SWE Project", Category = "swe" },
            new ProjectEntity { Title = "AI Project", Category = "ai-ml" }
        );
        await context.SaveChangesAsync();

        var service = new ProjectService(context);
        var result = await service.GetProjectsByTypeAsync("SwE");

        Assert.Single(result);
        Assert.Equal("SWE Project", result[0].Title);
    }

    [Fact]
    public async Task GetProjectsByTypeAsync_ValidType_ReturnsMatchingProjects()
    {
        using var context = CreateInMemoryContext();
        context.Projects.AddRange(
            new ProjectEntity { Title = "SWE Project1", Category = "swe" },
            new ProjectEntity { Title = "SWE Project2", Category = "swe" },
            new ProjectEntity { Title = "AI Project", Category = "ai-ml" }
        );
        await context.SaveChangesAsync();

        var service = new ProjectService(context);
        var result = await service.GetProjectsByTypeAsync("swe");

        Assert.Equal(2, result.Count);
        Assert.Contains(result, p => p.Title == "SWE Project1");
        Assert.Contains(result, p => p.Title == "SWE Project2");
        Assert.DoesNotContain(result, p => p.Title == "AI Project");
    }

    [Fact]
    public async Task GetProjectsByTypeAsync_ValidType_ReturnsCorrectOrder()
    {
        var context = CreateInMemoryContext();
        context.Projects.AddRange(
            new ProjectEntity { Title = "CS Project", Category = "cs", CreatedAtUtc = DateTime.UtcNow },
            new ProjectEntity { Title = "CS Project2", Category = "cs", CreatedAtUtc = DateTime.UtcNow }
        );
        await context.SaveChangesAsync();

        var service = new ProjectService(context);
        var result = await service.GetProjectsByTypeAsync("cs");

        Assert.Equal("CS Project2", result[0].Title);
        Assert.Equal("CS Project", result[1].Title);
    }
}
