using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using www__labb4__solo.Data;

namespace www__labb4__solo.Models
{
    public class SeedQuestions
    {

        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new QuizContext(
                serviceProvider.GetRequiredService<DbContextOptions<QuizContext>>()))
            {
                // Look for any question.
                if (context.Questions.Any())
                {
                    return;   // DB has been seeded
                }

                context.Questions.AddRange(
                    new Question
                    {
                        _question = "Hur många länder finns det i världen?",
                        Answer1 = "195",
                        Answer2 = "560",
                        Answer3 = "90",
                        RightAnswer = "195"
                    },
                    new Question
                    {
                        _question = "Vad hade Einstein i IQ? ",
                        Answer1 = "210",
                        Answer2 = "110",
                        Answer3 = "160",
                        RightAnswer = "160"
                    },
                    new Question
                    {
                        _question = "Vilket år lanserades kexchoklad? ",
                        Answer1 = "1938",
                        Answer2 = "1918",
                        Answer3 = "1991",
                        RightAnswer = "1938"
                    },
                    new Question
                    {
                        _question = "Världens största land till ytan?",
                        Answer1 = "Kanada",
                        Answer2 = "Ryssland",
                        Answer3 = "Kina",
                        RightAnswer = "Ryssland"
                    },
                    new Question
                    {
                        _question = "Världens mest befolkade land?",
                        Answer1 = "Brasilien",
                        Answer2 = "Indien",
                        Answer3 = "Kina",
                        RightAnswer = "Kina"
                    },
                    new Question
                    {
                        _question = "Vem var Martin Luther? ",
                        Answer1 = "En munk",
                        Answer2 = "President i USA",
                        Answer3 = "En tennisspelare",
                        RightAnswer = "En munk"
                    },
                    new Question
                    {
                        _question = "Vem var Lenin?",
                        Answer1 = "Uppfinnare av tetra pak",
                        Answer2 = "Rysk politiker",
                        Answer3 = "Uppfinnare av glödlampan",
                        RightAnswer = "Rysk politiker"
                    },
                    new Question
                    {
                        _question = "Vad är kolera? ",
                        Answer1 = "En sjukdom",
                        Answer2 = "En insekt som man får i magen",
                        Answer3 = "En maträtt",
                        RightAnswer = "En sjukdom"
                    },
                    new Question
                    {
                        _question = "Vad är Pi?",
                        Answer1 = "Japanskt ord",
                        Answer2 = "Matematisk konstant",
                        Answer3 = "En insekt",
                        RightAnswer = "Matematisk konstant"
                    },
                    new Question
                    {
                        _question = "Konstnär med avskuren öron-bit?",
                        Answer1 = "Salvador Dali",
                        Answer2 = "Vincent Van Gogh",
                        Answer3 = "Pablo Picasso",
                        RightAnswer = "Vincent Van Gogh"
                    },
                    new Question
                    {
                        _question = "Regissören Quentin Tarantinos födelsestad?",
                        Answer1 = "Amsterdam",
                        Answer2 = "Tampa, Florida",
                        Answer3 = "Knoxville, Texas",
                        RightAnswer = "Knoxville, Texas"
                    },
                    new Question
                    {
                        _question = "Vad är en fresk?",
                        Answer1 = "En blomma",
                        Answer2 = "En väggmålning",
                        Answer3 = "Ett landmärke",
                        RightAnswer = "En väggmålning"
                    },
                    new Question
                    {
                        _question = "Världens varmaste öken?",
                        Answer1 = "Dasht-e Lut, Iran",
                        Answer2 = "Rub al Khali, Arabiska halvön",
                        Answer3 = "Sahara, Nordafrika",
                        RightAnswer = "Dasht-e Lut, Iran"
                    },
                    new Question
                    {
                        _question = "Världens högsta berg?",
                        Answer1 = "K2",
                        Answer2 = "Kangchenjunga",
                        Answer3 = "Mount Everest",
                        RightAnswer = "Mount Everest"
                    },
                    new Question
                    {
                        _question = "Boken ”Den gamle och havet” handlar om?",
                        Answer1 = "En fisketur",
                        Answer2 = "Livets kamp och hopp",
                        Answer3 = "Sekelskiftesliv i Paris",
                        RightAnswer = "Livets kamp och hopp"
                    },
                    new Question
                    {
                        _question = "Vad är hippologi?",
                        Answer1 = "Läran om skelettet",
                        Answer2 = "Läran om bergarter",
                        Answer3 = "Läran om hästar",
                        RightAnswer = "Läran om hästar"
                    },
                    new Question
                    {
                        _question = "Vad betyder florera?",
                        Answer1 = "Utsmycka",
                        Answer2 = "Frodas",
                        Answer3 = "Övertäcka",
                        RightAnswer = "Frodas"
                    },
                    new Question
                    {
                        _question = "1923 års Nobelpris i medicin vanns av?",
                        Answer1 = "Frederick Banting och John Macleod",
                        Answer2 = "Johannes Fibiger",
                        Answer3 = "Charles Nicolle",
                        RightAnswer = "Frederick Banting och John Macleod"
                    },
                    new Question
                    {
                        _question = "Nukleär betyder?",
                        Answer1 = "Som gäller atomkärnan",
                        Answer2 = "Profetisk",
                        Answer3 = "Alldaglig",
                        RightAnswer = "Som gäller atomkärnan"
                    },
                    new Question
                    {
                        _question = "Världens mest sålda bok?",
                        Answer1 = "Harry Potter serien",
                        Answer2 = "Bibeln",
                        Answer3 = "Maos Lilla Röda",
                        RightAnswer = "Bibeln"
                    }





                  );
                    context.SaveChanges();





            }  
        }



    }  //klass slutar här
}
