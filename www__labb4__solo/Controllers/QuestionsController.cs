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
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {
        private readonly QuizContext _context;

        public QuestionsController(QuizContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public IEnumerable<Question> GetQuestions()
        {
            
            return _context.Questions;
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
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

            return Ok(question);
        }







        // GET: /CreateQuestion
        [Route("CreateQuestion")]
        [HttpGet]
        public string CreateQuestion(string _question, string answer1, string answer2, string answer3,  string rightAnswer)
        {



            Question CreatedQuestion = new Question
            {
                _question = _question,
                Answer1 = answer1,
                Answer2 = answer2,
                Answer3 = answer3,
                RightAnswer = rightAnswer
            };

            _context.Questions.Add(CreatedQuestion);
            _context.SaveChanges();
            

            return "Question added";

        }






        [HttpGet("UpdateQuestion")]
        public async Task<IActionResult> UpdateQuestion(int id, string _question, string answer1, 
            string answer2, string answer3, string rightAnswer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);
            if (question == null)
                return BadRequest();

            question.Id = id;
            question._question = _question;
            question.Answer1 = answer1;
            question.Answer2 = answer2;
            question.Answer3 = answer3;
            question.RightAnswer = rightAnswer;
            

            _context.Questions.Update(question);
            await _context.SaveChangesAsync();

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

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}