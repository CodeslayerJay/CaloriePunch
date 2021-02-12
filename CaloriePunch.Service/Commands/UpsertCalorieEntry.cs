using AutoMapper;
using CaloriePunch.Domain.Entities;
using CaloriePunch.Infrastructure.EF;
using CaloriePunch.Service.Common;
using CaloriePunch.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaloriePunch.Service.Commands
{
    public class UpsertCalorieEntry
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public UpsertCalorieEntry(AppDbContext appDbContext, IMapper mapper)
        {
            _dbContext = appDbContext;
            _mapper = mapper;
        }

        public async Task<ActionResponse<CalorieEntryDTO>> SaveAsync(CalorieEntryDTO dto)
        {
            var response = new ActionResponse<CalorieEntryDTO>();

            var entry = _dbContext.CalorieEntries.Where(q => q.Id == dto.Id).FirstOrDefault();

            if(entry == null)
            {
                entry = new CalorieEntry();
                entry.CreatedAt = DateTime.Now;
            }

            entry.EntryName = dto.EntryName;
            entry.Calories = dto.Calories;
            entry.Carbs = dto.Carbs;
            entry.Fat = dto.Fat;
            entry.Protein = dto.Protein;

            await _dbContext.SaveChangesAsync();

            dto.Id = entry.Id;

            response.ResultObj = dto;
            return response;
            
        }


    }
}
