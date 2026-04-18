using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectCardColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string[]>(
                name: "Authors",
                table: "ProjectCards",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProjectCards",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "ProjectCards",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string[]>(
                name: "Tags",
                table: "ProjectCards",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "ProjectCards",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Authors",
                table: "ProjectCards");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProjectCards");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "ProjectCards");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "ProjectCards");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "ProjectCards");
        }
    }
}
