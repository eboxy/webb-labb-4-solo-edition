using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace www__labb4__solo.Models    
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Round { get; set; }


        public IList<Question> Questions { get; set; }
        public IList<Score> Scores { get; set; }
    }
}
