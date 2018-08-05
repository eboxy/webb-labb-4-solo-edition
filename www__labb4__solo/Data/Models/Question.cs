using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace www__labb4__solo.Models   
{
    public class Question
    {
        public int Id { get; set; }
        public string _question { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string RightAnswer { get; set; }

        public Quiz Quiz { get; set; }

    }
}
