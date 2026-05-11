using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Portfolio.Api.Data;

public class ProjectConfiguration : BaseConfiguration<ProjectEntity>
{
    public override void Configure(EntityTypeBuilder<ProjectEntity> builder)
    {
        base.Configure(builder);
        
        builder.Property(e => e.Authors)
            .HasDefaultValueSql("'{}'");
        
        builder.Property(e => e.Tags)
            .HasDefaultValueSql("'{}'");
    }
}
