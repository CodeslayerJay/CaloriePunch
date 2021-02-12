using Microsoft.EntityFrameworkCore.Migrations;

namespace CaloriePunch.Infrastructure.EF.Migrations
{
    public partial class AddQuantityToCalorieEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "CalorieEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "CalorieEntries");
        }
    }
}
