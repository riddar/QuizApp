using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public int Time { get; set; }
        public string Content { get; set; }
        public IList<Score> Scores { get; set; }
        public IList<Alternative> Alternatives { get; set; }

    }
}
