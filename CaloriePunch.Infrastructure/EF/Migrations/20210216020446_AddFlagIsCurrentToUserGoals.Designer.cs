﻿// <auto-generated />
using System;
using CaloriePunch.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CaloriePunch.Infrastructure.EF.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20210216020446_AddFlagIsCurrentToUserGoals")]
    partial class AddFlagIsCurrentToUserGoals
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CaloriePunch.Domain.Entities.CalorieEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double?>("Calories")
                        .HasColumnType("float");

                    b.Property<double?>("Carbs")
                        .HasColumnType("float");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("EntryName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Fat")
                        .HasColumnType("float");

                    b.Property<double?>("Protein")
                        .HasColumnType("float");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CalorieEntries");
                });

            modelBuilder.Entity("CaloriePunch.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Key")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CaloriePunch.Domain.Entities.UserGoal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DateAchieved")
                        .HasColumnType("datetime2");

                    b.Property<int>("GoalType")
                        .HasColumnType("int");

                    b.Property<double?>("GoalWeight")
                        .HasColumnType("float");

                    b.Property<bool>("IsCurrent")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<double?>("WeeklyCalories")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserGoals");
                });

            modelBuilder.Entity("CaloriePunch.Domain.Entities.CalorieEntry", b =>
                {
                    b.HasOne("CaloriePunch.Domain.Entities.User", "User")
                        .WithMany("CalorieEntries")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("CaloriePunch.Domain.Entities.UserGoal", b =>
                {
                    b.HasOne("CaloriePunch.Domain.Entities.User", "User")
                        .WithMany("UserGoals")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("CaloriePunch.Domain.Entities.User", b =>
                {
                    b.Navigation("CalorieEntries");

                    b.Navigation("UserGoals");
                });
#pragma warning restore 612, 618
        }
    }
}