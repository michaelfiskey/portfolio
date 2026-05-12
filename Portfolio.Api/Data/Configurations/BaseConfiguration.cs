using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Portfolio.Api.Data;

public abstract class BaseConfiguration<T> : IEntityTypeConfiguration<T>
    where T : BaseEntity
{
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
        builder.Property(e => e.Id)
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();
            
        builder.Property(e => e.CreatedAtUtc)
            .HasDefaultValueSql("now()")
            .ValueGeneratedOnAdd();
        
    }
}
