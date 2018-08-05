using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using www__labb4__solo.Data;
using www__labb4__solo.Models;

namespace www__labb4__solo.Controllers
{
    [Produces("application/json")]
    [Route("api/Scores")]
    public class ScoresController : Controller
    {
        private readonly QuizContext _context;

        public ScoresController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Scores
        [HttpGet]
        public IEnumerable<Score> GetScores()
        {
            //return _context.Scores;
            return _context.Scores.OrderBy(n => n.Player).OrderByDescending(p => p.Points).Take(10);
        }

        
        // GET: api/Scores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var score = await _context.Scores.SingleOrDefaultAsync(m => m.Id == id);

            if (score == null)
            {
                return NotFound();
            }

            return Ok(score);
        }


        //lägger till spelare och dess senaste score i db

        [Route("CreateScore")]
        [HttpGet]
        public string CreateScore(string playerName, int points)
        {
            Score Score = new Score
            {
                Points = points,
                Player = playerName
            };

            _context.Scores.Add(Score);
            _context.SaveChanges();

            return "Score added";

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

            _context.Entry(score).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

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

            var score = await _context.Scores.SingleOrDefaultAsync(m => m.Id == id);
            if (score == null)
            {
                return NotFound();
            }

            _context.Scores.Remove(score);
            await _context.SaveChangesAsync();

            return Ok(score);
        }

        private bool ScoreExists(int id)
        {
            return _context.Scores.Any(e => e.Id == id);
        }
    }
}