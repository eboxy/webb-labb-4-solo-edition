using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace www__labb4__solo.Models   
{
    public class Score
    {
        
        public int Id { get; set; }
        public int Points { get; set; }
        public string Player { get; set; }

        public Quiz Quiz { get; set; }
    }
}
