using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CaloriePunch.API.Tooling;
using CaloriePunch.Domain.Entities;
using CaloriePunch.Infrastructure.EF;
using CaloriePunch.Infrastructure.EF.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CaloriePunch.API.Controllers
{

    [ApiController]
    public class CalorieController : BaseApiController
    {
        private readonly AppDbContext _dbContext;

        public CalorieController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> UpsertCalorieEntry(CalorieEntryDTO dto)
        {
            try
            {
                var calorieEntry = _dbContext.CalorieEntries.Where(q => q.Id == dto.Id).FirstOrDefault();

                if (calorieEntry == null)
                {
                    calorieEntry = new CalorieEntry();
                    _dbContext.CalorieEntries.Add(calorieEntry);

                    calorieEntry.CreatedAt = DateTime.Now;
                    calorieEntry.UserId = 1;
                }

                calorieEntry.Quantity = dto.Quantity > 0 == false ? 1 : dto.Quantity;
                calorieEntry.Calories = dto.Calories;
                calorieEntry.Carbs = dto.Carbs;
                calorieEntry.EntryName = dto.EntryName;
                calorieEntry.Protein = dto.Protein;
                calorieEntry.Fat = dto.Fat;

                await _dbContext.SaveChangesAsync();

                dto.Id = calorieEntry.Id;

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(AppConstants.GenericErrorMsg);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            try
            {
                return Ok(_dbContext.CalorieEntries.Where(q => q.UserId == userId).ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(AppConstants.GenericErrorMsg);
            }
        }

        [HttpDelete("{userId}/{entryId}")]
        public async Task<IActionResult> Delete(int userId, int entryId)
        {
            try
            {
                var entry = _dbContext.CalorieEntries.Where(q => q.Id == entryId && q.UserId == userId).FirstOrDefault();

                if(entry != null)
                {
                    _dbContext.CalorieEntries.Remove(entry);
                    await _dbContext.SaveChangesAsync();

                    return Ok(true);
                }

                return Ok(false);
            }
            catch(Exception ex)
            {
                return BadRequest(AppConstants.GenericErrorMsg);
            }
        }

        [HttpGet("allowances/{userId}")]
        public async Task<IActionResult> GetAllowances(int userId)
        {
            try
            {
                var today = DateTime.Now.Date;
                var tomorrow = today.AddDays(1).Date;
                var dayOfTheWeek = (int)DateTime.Now.Date.DayOfWeek;
                var startOfWeek = DateTime.Now.Date.AddDays((int)DateTime.Now.Date.DayOfWeek * -1);
                var endOfWeek = DateTime.Now.Date.AddDays(DayOfWeek.Saturday - today.DayOfWeek).Date;

                var userGoal = _dbContext.UserGoals.Where(q => q.UserId == userId && q.IsCurrent == true && q.WeeklyCalories != null).FirstOrDefault();

                if (userGoal == null)
                    return Ok();


                var dailySum = (from c in _dbContext.CalorieEntries
                             where c.CreatedAt >= today && c.CreatedAt < tomorrow
                             select c.Calories).Sum();

                var weeklySum = (from c in _dbContext.CalorieEntries
                              where c.CreatedAt >= startOfWeek && c.CreatedAt < endOfWeek
                              select c.Calories).Sum();

                var weekly = userGoal.WeeklyCalories - weeklySum;
                var daily = weekly / (7 - dayOfTheWeek) > 0 ? (weekly / (7 - dayOfTheWeek)) - dailySum : 0;

                return Ok(new { dailyAllowance = Math.Round(daily.Value, 2, MidpointRounding.AwayFromZero), weeklyAllowance = Math.Round(weekly.Value, 2, MidpointRounding.AwayFromZero) });

            }
            catch(Exception ex)
            {
                return BadRequest(AppConstants.GenericErrorMsg);
            }
        }
    }
}