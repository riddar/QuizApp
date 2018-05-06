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
    [Route("api/Alternatives")]
    public class AlternativesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AlternativesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Alternatives
        [HttpGet]
        public IEnumerable<Alternative> GetAlternatives()
        {
            return _context.Alternatives;
        }

        // GET: api/Alternatives/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlternative([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var alternative = await _context.Alternatives.SingleOrDefaultAsync(m => m.Id == id);

            if (alternative == null)
            {
                return NotFound();
            }

            return Ok(alternative);
        }

        // PUT: api/Alternatives/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlternative([FromRoute] int id, [FromBody] Alternative alternative)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != alternative.Id)
            {
                return BadRequest();
            }

            _context.Entry(alternative).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlternativeExists(id))
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

        // POST: api/Alternatives
        [HttpPost]
        public async Task<IActionResult> PostAlternative([FromBody] Alternative alternative)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Alternatives.Add(alternative);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlternative", new { id = alternative.Id }, alternative);
        }

        // DELETE: api/Alternatives/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlternative([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var alternative = await _context.Alternatives.SingleOrDefaultAsync(m => m.Id == id);
            if (alternative == null)
            {
                return NotFound();
            }

            _context.Alternatives.Remove(alternative);
            await _context.SaveChangesAsync();

            return Ok(alternative);
        }

        private bool AlternativeExists(int id)
        {
            return _context.Alternatives.Any(e => e.Id == id);
        }
    }
}