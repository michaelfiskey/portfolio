using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Portfolio.Api.Data;

public class UserConfiguration : BaseConfiguration<UserEntity>
{
    public override void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        base.Configure(builder);
    }
}
