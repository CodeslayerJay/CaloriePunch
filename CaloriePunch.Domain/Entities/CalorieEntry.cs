using System;
using System.Collections.Generic;
using System.Text;

namespace CaloriePunch.Domain.Entities
{
    public class CalorieEntry : EntityBase
    {
        public double Calories { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
