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

                if(calorieEntry == null)
                {
                    calorieEntry = new CalorieEntry();
                    _dbContext.CalorieEntries.Add(calorieEntry);

                    calorieEntry.CreatedAt = DateTime.Now;
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
            catch(Exception ex)
            {
                return BadRequest(AppConstants.GenericErrorMsg);
            }
        }
    }
}