using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultValuesToProjectAndBaseEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string[]>(
                name: "Tags",
                table: "Projects",
                type: "text[]",
                nullable: false,
                defaultValueSql: "'{}'",
                oldClrType: typeof(string[]),
                oldType: "text[]");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "Projects",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string[]>(
                name: "Authors",
                table: "Projects",
                type: "text[]",
                nullable: false,
                defaultValueSql: "'{}'",
                oldClrType: typeof(string[]),
                oldType: "text[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "now()");

            migrationBuilder.AlterColumn<string[]>(
                name: "Tags",
                table: "Projects",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(string[]),
                oldType: "text[]",
                oldDefaultValueSql: "'{}'");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "Projects",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "now()");

            migrationBuilder.AlterColumn<string[]>(
                name: "Authors",
                table: "Projects",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(string[]),
                oldType: "text[]",
                oldDefaultValueSql: "'{}'");
        }
    }
}
