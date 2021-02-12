using CaloriePunch.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CaloriePunch.Service.Common
{
    public class ActionResponse<TEntity> where TEntity : class
    {
        public ActionResponse()
        {
            _validationErrors = new List<string>();
            ResultCollection = new HashSet<TEntity>();
        }

        private List<string> _validationErrors;

        public IEnumerable<string> ValidationErrors => _validationErrors;
        public bool isSuccess => _validationErrors.Any() == false;

        public TEntity ResultObj { get; set; }
        public ICollection<TEntity> ResultCollection { get; set; }

        public void AddError(string message)
        {
            if (string.IsNullOrEmpty(message) == false)
                _validationErrors.Add(message);
        }
    }
}
