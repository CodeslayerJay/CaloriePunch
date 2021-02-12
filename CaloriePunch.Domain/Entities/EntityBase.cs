using CaloriePunch.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CaloriePunch.Domain.Entities
{
    public abstract class EntityBase : IEntity
    {
        public int Id { get; set; }
    }
}
