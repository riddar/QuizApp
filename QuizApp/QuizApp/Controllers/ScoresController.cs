using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Data;
using QuizApp.Models;

namespace QuizApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Scores")]
    public class ScoresController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public ScoresController(ApplicationDbContext _context, UserManager<ApplicationUser> _userManager)
        {
            context = _context;
            userManager = _userManager;
        }

        // GET: api/Scores
        [HttpGet]
        public IEnumerable<Score> GetScores()
        {
            return context.Scores;
        }

        // GET: api/Scores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var score = await context.Scores.SingleOrDefaultAsync(m => m.Id == id);

            if (score == null)
            {
                return NotFound();
            }

            return Ok(score);
        }

        // PUT: api/Scores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScore([FromRoute] int id, [FromBody] Score score)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != score.Id)
            {
                return BadRequest();
            }

            context.Entry(score).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
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

        // POST: api/Scores
        [HttpPost]
        public async Task<IActionResult> PostScore([FromBody] Score score)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Scores.Add(score);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetScore", new { id = score.Id }, score);
        }

        // DELETE: api/Scores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var score = await context.Scores.SingleOrDefaultAsync(m => m.Id == id);
            if (score == null)
            {
                return NotFound();
            }

            context.Scores.Remove(score);
            await context.SaveChangesAsync();

            return Ok(score);
        }

        // Add: api/scores/5
        [HttpPost("{id, points, timeTaken, questionId}")]
        public async Task<IActionResult> AddScore([FromRoute] int id, [FromRoute] int points, [FromRoute] int timeTaken)
        {
            var question = await context.Questions.Include(q => q.Alternatives).Where(q => q.Id == id).FirstOrDefaultAsync();

            if (question == null)
                return NotFound();

            Score tempScore = new Score
            {
                Points = points,
                TimeTaken = timeTaken,
                Question = question,
                QuestionId = question.Id
            };

            context.Scores.Add(tempScore);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetScore), new { id = tempScore.Id }, tempScore);
        }

        [HttpGet("CreateScore")]
        public async Task<IActionResult> CreateScore(int points, int timeTaken, int questionId)
        {
            DateTime date = new DateTime();
            Score score = new Score
            {
                Points = points,
                TimeTaken = timeTaken,
                Date = date,
                QuestionId = questionId
            };

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            context.Scores.Add(score);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetScore", new { id = score.Id }, score);
        }

        private bool ScoreExists(int id)
        {
            return context.Scores.Any(e => e.Id == id);
        }
    }
}