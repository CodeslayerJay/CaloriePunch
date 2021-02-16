using System;
using System.Collections.Generic;
using System.Text;

namespace CaloriePunch.Domain.Entities
{
    public class User : EntityBase
    {
        public User()
        {
            CalorieEntries = new HashSet<CalorieEntry>();
            UserGoals = new HashSet<UserGoal>();
        }
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public byte[] Key { get; set; }

        public virtual ICollection<CalorieEntry> CalorieEntries { get; set; }
        public virtual ICollection<UserGoal> UserGoals { get; set; }
    }
}
