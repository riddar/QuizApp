using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Data;
using QuizApp.Models;

namespace QuizApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet("GetQuestions")]
        public IEnumerable<Question> GetQuestions()
        {
            var questions = _context.Questions;
            return questions;
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);

            if (question == null)
                return NotFound();

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        [HttpGet("GetRandomQuestions")]
        public IEnumerable<Question> GetRandomQuestions()
        {
            var rand = new Random();
            var size = 10;
            var questions = _context.Questions.OrderBy(c => rand.Next()).Take(size).ToList();

            foreach (var question in questions)
                if (question == null)
                    questions.Remove(question);

            return questions;
        }

        [HttpGet("GetRandomQuestion")]
        public Question GetRandomQuestion()
        {
            var rand = new Random();
            Question question = new Question();
            do
            {
                question = _context.Questions.OrderBy(c => rand.Next()).Take(1).FirstOrDefault();
            } while (question == null);

            return question;
        }

        [HttpGet("CreateQuestion")]
        public async Task<IActionResult> CreateScore(int time, string content)
        {
            Question question = new Question
            {
                Time = time,
                Content = content
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}