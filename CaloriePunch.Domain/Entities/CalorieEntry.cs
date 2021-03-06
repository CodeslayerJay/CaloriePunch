﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CaloriePunch.Domain.Entities
{
    public class CalorieEntry : EntityBase
    {

        public int UserId { get; set; }
        public double? Calories { get; set; }
        public double? Fat { get; set; }
        public double? Carbs { get; set; }
        public double? Protein { get; set; }
        public int Quantity { get; set; }
        public string EntryName { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual User User { get; set; }
    }
}
