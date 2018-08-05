import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';


let Points: number;
Points = 0;


interface QuizQuestionProps {
}

interface QuizQuestionState {
    loading: boolean;
    questions: Question[];
    stepCounter: number;
    choosenAnswer: string;
    replyText: string;
    isRadioBtnDisabled: boolean;
    replyClassName: string;
    isQuizVisible: boolean;
    scoreState: number;
    isScoresVisible: boolean;
    isGetScoresButtonVisible: boolean;
    isEntryBtnHidden: boolean;
    isNextBtnHidden: boolean;
    isNameTextboxAndLabelVisible: boolean;
    playerName: string;
    isStartQuizBtnVisible: boolean;
    gameOverClassName: string;
    gameOverText1: string;
    gameOverText2: string;
    gameOverText3: string;
    gameOverText4: string;
    
}

interface Question {
    id: number;
    _question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    rightAnswer: string;
    
}






export class Quiz extends React.Component<QuizQuestionProps, QuizQuestionState> {
    constructor(props: QuizQuestionProps) {
        super(props);
        this.state = {
            loading: false,
            questions: [],
            stepCounter: 0,
            choosenAnswer: '',
            replyText: '',
            isRadioBtnDisabled: false,
            replyClassName: '',
            isQuizVisible: false,
            scoreState: 0,
            isScoresVisible: false,
            isGetScoresButtonVisible: false,
            isEntryBtnHidden: true,
            isNextBtnHidden: false,
            isNameTextboxAndLabelVisible: true,
            playerName: '',
            isStartQuizBtnVisible: false,
            gameOverClassName: '',
            gameOverText1: '',
            gameOverText2: '',
            gameOverText3: '',
            gameOverText4: ''
       
            
          };


        this.nextQuestion = this.nextQuestion.bind(this);
        this.answerToQuestion = this.answerToQuestion.bind(this);
        this.answerEntry = this.answerEntry.bind(this);
        this.getScores = this.getScores.bind(this);
        this.playerNameEntry = this.playerNameEntry.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.restartQuiz = this.restartQuiz.bind(this);
        this.addScoreToDb = this.addScoreToDb.bind(this);
        this.reShuffleQuestions = this.reShuffleQuestions.bind(this);
        

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                data.sort(function (a, b) {
                    return 0.5 - Math.random()    //shuffling av frågorna
                });

                this.setState({ questions: data, loading: true });

            });

   }





      public render() {

        let stepCounter = this.state.stepCounter;    //steg-räknare samt anger index på aktuell fråga 

        let questionStepCount = this.state.stepCounter;  //steg-räknare som anger steg i aktuell omgång

       let contents = this.state.loading
            ? this.renderQuestionTable(this.state.questions, stepCounter, questionStepCount)
            : <p><em>Loading...</em></p>;    

          
        //console.log(this.state.playerName)

        return <div> {contents} </div>;


    }

  



    public renderQuestionTable(questions: Question[], stepCounter1: number, questionStepCount1: number) {

        return <div>

           

            <h3 hidden={!this.state.isNameTextboxAndLabelVisible} className="nameLabel">Vad heter du?</h3>
            <h4 hidden={!this.state.isNameTextboxAndLabelVisible} className="nameLabel">
                Endast alfanumeriska- samt fråge-tecken för att få fram startknapp</h4>


            <input type="text" onChange={this.playerNameEntry} className="playerNameInput" id="playerNameInput" value={this.state.playerName} name="playername" hidden={!this.state.isNameTextboxAndLabelVisible}></input>

           

            <button className="btm btn-success btn-lg GreenBtn" id="startbutton" type="button" onClick={this.startQuiz}
                hidden={!this.state.isStartQuizBtnVisible}> Starta Quiz!</button>
           
            



          <ul className="list-group" hidden={!this.state.isQuizVisible}> 

                {/*   för diagnostiska syften
                <label className="list-group-item">
                    <div value={questions[stepCounter1].id} > Id:   {questions[stepCounter1].id}</div>   
                </label>
                */}



                <div className="list-group-item questheadercolor"><h3>Fråga {questionStepCount1 + 1}/5 : {questions[stepCounter1]._question}</h3>
                </div>


                <label className="list-group-item">
                    <input onChange={this.answerToQuestion}
                        id='answer1'
                        type="radio"
                        name="answer"
                        disabled={this.state.isRadioBtnDisabled}
                        checked={this.state.choosenAnswer === questions[stepCounter1].answer1}
                        value={questions[stepCounter1].answer1} /> {questions[stepCounter1].answer1}</label>




                <label className="list-group-item">
                    <input onChange={this.answerToQuestion}
                        id='answer2'
                        type="radio"
                        name="answer"
                        disabled={this.state.isRadioBtnDisabled}
                        checked={this.state.choosenAnswer === questions[stepCounter1].answer2}
                        value={questions[stepCounter1].answer2} /> {questions[stepCounter1].answer2}</label>




                <label className="list-group-item">
                    <input onChange={this.answerToQuestion}     
                        id='answer3'
                        type="radio"
                        name="answer"
                        disabled={this.state.isRadioBtnDisabled}
                        checked={this.state.choosenAnswer === questions[stepCounter1].answer3}
                        value={questions[stepCounter1].answer3} /> {questions[stepCounter1].answer3}</label>


                {/*   för diagnostiska syften
                <label className="list-group-item">
                    <div value={questions[stepCounter1].rightAnswer} > Rätt svar:   {questions[stepCounter1].rightAnswer}</div>
               </label>
               */}


              

                <button hidden={!this.state.isEntryBtnHidden} className="btn-pill btn-success btn-lg GreenBtn"
                    onClick={this.answerEntry} id="svarsbutton"> Svara </button>

                 
                <h3 className={this.state.replyClassName}>{this.state.replyText}</h3>
                
                <h3 id="gameOverText1">{this.state.gameOverText1}</h3>
                <h3 id="gameOverText2">{this.state.gameOverText2}</h3>
                <h3 id="gameOverText3">{this.state.gameOverText3}</h3>
                <h3 id="gameOverText4">{this.state.gameOverText4}</h3>

                <button hidden={!this.state.isNextBtnHidden} className="btn-pill btn-danger btn-lg GreenBtn"
                    type="button" onClick={this.nextQuestion}>Nästa</button>

                
                <button hidden={!this.state.isGetScoresButtonVisible}
                    className="btn-pill btn-warning btn-lg GreenBtn" type="button"  
                    onClick={this.getScores} id="resultatbutton">Se Resultat</button>



            </ul>



            <div hidden={!this.state.isScoresVisible}>
                <div className="restartArea">
                    <h2>Bra gjort {this.state.playerName}!</h2>
                    <h3 >Du fick {Points} poäng</h3> 
                </div>

              <button className="btn btn-danger btn-lg GreenBtn" id="restartbutton"
               onClick={this.restartQuiz}>Starta om quiz</button>   

          </div>

           





      </div>;   //return ends here
        


    }   //class ends here



    answerToQuestion(event: any) {
        this.setState({ choosenAnswer: event.target.value })
    }

   


    public answerEntry(event: any) {
        this.setState({ isNextBtnHidden: true });
        this.setState({ isEntryBtnHidden: false });
        this.setState({ isRadioBtnDisabled: true });

        //kollar om det valda svarsalternativet är det rätta
        if (this.state.questions[this.state.stepCounter].rightAnswer == this.state.choosenAnswer) {
            Points++;
            this.setState({ scoreState: Points });
            this.setState({ replyClassName: 'ratt' });
            this.setState({ replyText: "Rätt svar :D" })
            console.log('Rätt svar :D');

            this.checkIfLastQuestionOfRound();
        }
        else {
            this.setState({ replyClassName: 'fel' });
            this.setState({ replyText: "Fel svar" });
            console.log('Fel svar')
            this.checkIfLastQuestionOfRound();
        }

    }



    

    checkIfLastQuestionOfRound() {

        if (this.state.stepCounter + 1 == 5) {  //frågeomgångens längd
            this.setState({ gameOverText1: "<GAME OVER>" })    
            this.setState({ gameOverText2: "<GAME OVER>" })    
            this.setState({ gameOverText3: "<GAME OVER>" })    
            this.setState({ gameOverText4: "<GAME OVER>" })    
            this.setState({ isNextBtnHidden: false });
            this.setState({ isGetScoresButtonVisible: true });
            this.addScoreToDb(Points);
         }
    }




     nextQuestion(event: any) {
        let count = this.state.stepCounter + 1;
        this.setState({ stepCounter: count });

          
        this.setState({ choosenAnswer: '' });
        this.setState({ replyText: '' });
        this.setState({ isNextBtnHidden: false });
        this.setState({ isEntryBtnHidden: true});

        this.setState({ isRadioBtnDisabled: false });

    }




    getScores(event: any) {
        this.setState({ isScoresVisible: true });
        this.setState({ isNextBtnHidden: false });
        this.setState({ isEntryBtnHidden: false });
        this.setState({ isRadioBtnDisabled: true });
        this.setState({ isQuizVisible: false });
        this.setState({ isStartQuizBtnVisible: false });
        this.setState({ isNameTextboxAndLabelVisible: false });
        this.setState({ gameOverText1: '' });
        this.setState({ gameOverText2: '' });
        this.setState({ gameOverText3: '' });
        this.setState({ gameOverText4: '' });
    }




    playerNameEntry(event: any) {

        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9? ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {

            this.setState({ playerName: event.target.value });
            this.setState({ isStartQuizBtnVisible: false });

            //syntax: regex.test(input pattern)

        }
         else if (!regexOnlyAlphanumveric.test(event.target.value)) {

            this.setState({ playerName: event.target.value });
            this.setState({ isStartQuizBtnVisible: true });
        }

     }



    



    startQuiz(event: any) {
        this.setState({ isQuizVisible: true });
        this.setState({ isStartQuizBtnVisible: false });
        this.setState({ isNameTextboxAndLabelVisible: false });
        this.setState({ scoreState: 0 });
        Points = 0;

        console.log('Quiz has started');
    }



      restartQuiz(event: any) {
        this.setState({ stepCounter: 0 });
        let count = this.state.stepCounter;
        this.setState({ isNameTextboxAndLabelVisible: true });
        this.setState({ isStartQuizBtnVisible: false });
        this.setState({ playerName: '' });
        Points = 0;
        this.setState({ isScoresVisible: false });
        this.setState({ isGetScoresButtonVisible: false });
        this.setState({ replyText: '' });
        this.setState({ isRadioBtnDisabled: false });
        this.setState({ isEntryBtnHidden: true });
        

          this.reShuffleQuestions();  //shuffle efter varje omstart av quez:et

          console.log('Quiz has restarted');
    }

    


    addScoreToDb(Points: number) {

        fetch('api/Scores/CreateScore?playerName=' + this.state.playerName + '&points=' + Points)
            .then(response => console.log('Status: ', response.status));

        this.setState({ scoreState: 0 });
    }
    



    
    reShuffleQuestions() {

            let shuffledQuestions = this.state.questions;

            //re-shuffling av frågorna
            shuffledQuestions.sort(function (a, b) { return 0.5 - Math.random() }); 

            console.log('Questions has been reshuffled');

            this.setState({ questions: shuffledQuestions, loading: true });
        }

    
    
    


}  //class ends here


