using Microsoft.EntityFrameworkCore.Migrations;

namespace CaloriePunch.Infrastructure.EF.Migrations
{
    public partial class AddFlagIsCurrentToUserGoals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCurrent",
                table: "UserGoals",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCurrent",
                table: "UserGoals");
        }
    }
}
