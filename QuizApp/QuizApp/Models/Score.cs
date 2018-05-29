using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Models
{
    public class Score
    {
        [Key]
        public int Id { get; set; }
        public int Points { get; set; }
        public DateTime Date { get; set; }
        public int TimeTaken { get; set; }    
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
        public int QuestionId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}
