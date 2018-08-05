using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using www__labb4__solo.Models;




namespace www__labb4__solo.Data
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {}

           
            public DbSet<Quiz> Quiz { get; set; }
        	public DbSet<Question> Questions { get; set; }
           public DbSet<Score> Scores { get; set; }
            		



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var quizModel = modelBuilder.Entity<Quiz>();
            var questionsModel = modelBuilder.Entity<Question>();
            var scoreModel = modelBuilder.Entity<Score>();


            quizModel.ToTable("Quiz");
	questionsModel.ToTable("Questions");
            scoreModel.ToTable("Scores");


            
            modelBuilder.Entity<Question>()
             .HasOne(b => b.Quiz)
             .WithMany(g => g.Questions);

            modelBuilder.Entity<Score>()
                .HasOne(p => p.Quiz)
                .WithMany(g => g.Scores);

            modelBuilder.Entity<Quiz>()
                .HasMany(g => g.Questions)
                .WithOne(b => b.Quiz );
               

            modelBuilder.Entity<Quiz>()
                .HasMany(g => g.Scores)
                .WithOne(p => p.Quiz);
            


	base.OnModelCreating(modelBuilder);


        }

       

    }
}
