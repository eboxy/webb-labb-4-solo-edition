    import * as React from 'react';
import { RouteComponentProps, Redirect, Route } from 'react-router';
import 'isomorphic-fetch';
import { AddQuestion } from './AddQuestion';
import { EditQuestion } from './EditQuestion';



interface QuizQuestionProps {

   
    
}





interface QuizQuestionState {
    loading: boolean;
    questions: Question[];
    stepCounter: number;
    choosenQuestionId: number;
    replyText: string;
    isRadioBtnDisabled: boolean;
    replyClassName: string;
    isMainAreaVisible: boolean;
    scoreState: number;
    isAddQuestionAreaVisible: boolean;
    isToAddQuestionButtonVisible: boolean;
    isEntryBtnHidden: boolean;
    isNextBtnHidden: boolean;
    isPrevBtnHidden: boolean;
    isEditQuestionAreaVisible: boolean;
    isToEditQuestionButtonVisible: boolean;
    
    

}

export interface Question {
    id: number;
    _question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    rightAnswer: string;

}


 




   export class AdminQuestions extends React.Component<RouteComponentProps<{}>, QuizQuestionState> {
       constructor() {
         super();
           this.state = {
               loading: false,
            questions: [],
            stepCounter: 0,
            choosenQuestionId: 0,
            replyText: '',
            isRadioBtnDisabled: false,
            replyClassName: '',
            isMainAreaVisible: true,
            scoreState: 0,
            isAddQuestionAreaVisible: false,
            isToAddQuestionButtonVisible: true,
            isEntryBtnHidden: true,
            isNextBtnHidden: true,
            isPrevBtnHidden: false,
            isEditQuestionAreaVisible: false,
            isToEditQuestionButtonVisible: true
            
            



        };


        this.nextQuestion = this.nextQuestion.bind(this);
        this.addQuestionArea = this.addQuestionArea.bind(this);
        this.returnToMainArea = this.returnToMainArea.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.EditQuestionArea = this.EditQuestionArea.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        //this.updateQuestionFromProp = this.updateQuestionFromProp.bind(this);

        this.checkIfLastQuestionOfRound = this.checkIfLastQuestionOfRound.bind(this);
        this.checkIfFirstQuestionOfRound = this.checkIfFirstQuestionOfRound.bind(this);
        this.refreshAdminQuestionData = this.refreshAdminQuestionData.bind(this);


        

           fetch('api/Questions')
               .then(response => response.json() as Promise<Question[]>)
                .then(data => {
                this.setState({questions: data, loading: true});

               })

                   .catch(message => {  console.log('Error' + message);

               });






    } //constructor ends here









     public render() {


        let stepCounter = this.state.stepCounter;    //steg-räknare samt anger index på aktuell fråga 

        let questionStepCount = this.state.stepCounter;  //steg-räknare som anger steg i aktuell omgång

           let contents = this.state.loading
               ? this.renderQuestionTable(this.state.questions, stepCounter, questionStepCount)
               : <p><em>Loading...</em></p>; 


           return <div> {contents}


        </div>;


    }







       public renderQuestionTable(questions: Question[], stepCounter1: number, questionStepCount1: number) {

       
        return <div>


            <ul className="list-group" hidden={!this.state.isMainAreaVisible}>


                
                <div className="list-group-item questheadercolor"><h3>Fråga {questionStepCount1 + 1}/{this.state.questions.length}: {questions[stepCounter1]._question}</h3>
                </div>


                {/*   för diagnostiska syften   :-D
                <label className="list-group-item">
                    Id: {questions[stepCounter1].id}
                </label>
                */}


                <label className="list-group-item">
                    Alternativ 1: {questions[stepCounter1].answer1}
                 </label>


                <label className="list-group-item">
                   Alternativ 2:  {questions[stepCounter1].answer2}
                </label>

                <label className="list-group-item">
                    Alternativ 3: {questions[stepCounter1].answer3}
                 </label>


               
                <label className="list-group-item">
                    Rätt svar: {questions[stepCounter1].rightAnswer}
               </label>
               




                <button hidden={!this.state.isPrevBtnHidden} className="btn-pill btn-danger btn-lg"
                    type="button" onClick={this.prevQuestion} id="prevbutton">&#65308; Föregående</button>



                <button hidden={!this.state.isNextBtnHidden}   className="btn-pill btn-sucess btn-lg"
                    type="button" onClick={this.nextQuestion} id="nextbutton" >Nästa &#65310;</button>

               

                <h3 className={this.state.replyClassName}>{this.state.replyText}</h3>

                
                
                <button hidden={!this.state.isToAddQuestionButtonVisible}
                    className="btn-pill btn-warning btn-lg" type="button"
                    onClick={this.addQuestionArea} id="toaddquestionbutton">Till: Lägg till fråga</button>

                <button hidden={!this.state.isToEditQuestionButtonVisible}
                    className="btn-pill btn-warning btn-lg" type="button"
                      onClick={this.EditQuestionArea} id="toeditquestionbutton">Till: Ändra fråga</button>


                  <button hidden={!this.state.isToEditQuestionButtonVisible}
                      className="btn-pill btn-warning btn-lg" type="button"
                      onClick={this.deleteQuestion} id="deletequestionbutton">Ta bort fråga</button>


                



            </ul>




            
            
             <div hidden={!this.state.isAddQuestionAreaVisible}>
                
                  <AddQuestion

                    refreshAdminQuestionData={this.refreshAdminQuestionData.bind(this)}

                  />


                    <button className="btn btn-danger btn-lg"
                        onClick={this.returnToMainArea} id="backToMainAreaButton"> Tillbaka </button>

               </div>





            <div hidden={!this.state.isEditQuestionAreaVisible}>

                <EditQuestion 

                    id={this.state.questions[this.state.stepCounter].id}
                    _question={this.state.questions[this.state.stepCounter]._question}
                    answer1={this.state.questions[this.state.stepCounter].answer1}
                    answer2={this.state.questions[this.state.stepCounter].answer2}
                    answer3={this.state.questions[this.state.stepCounter].answer3}
                    rightAnswer={this.state.questions[this.state.stepCounter].rightAnswer}
                    //questionArrayLength={this.state.questions.length}

                    refreshAdminQuestionData={this.refreshAdminQuestionData.bind(this)}
                    
                />



                <button className="btn btn-danger btn-lg"
                    onClick={this.returnToMainArea} id="backToMainAreaButton2"
                    target="_self">Tillbaka
                </button>


            </div>



          </div>;   //return ends here



    }   //class ends here


    



       checkIfLastQuestionOfRound() {

        if (this.state.stepCounter + 1 == this.state.questions.length-1) {  //frågeomgångens längd
            this.setState({replyText: "Sista frågan" })

            this.setState({ replyClassName: 'ratt' });
            this.setState({ isNextBtnHidden: false });
            this.setState({ isPrevBtnHidden: true });
            
            
        }
    }


    

            checkIfFirstQuestionOfRound() {

           if (this.state.stepCounter - 1 == 0) {  //början av frågeomgången
               this.setState({ replyText: "Första frågan" })

               this.setState({ replyClassName: 'fel' });
               this.setState({ isNextBtnHidden: true });
               this.setState({ isPrevBtnHidden: false });


           }
       }
       
       





       nextQuestion(event: any) {


           if (this.state.stepCounter == this.state.questions.length - 1) {  //så man inte hamnar utanför arrayen
               this.setState({ replyText: "Ooops, utanför listan, backa lite :)" })
           }
           else
           { 


                let count = this.state.stepCounter + 1;
                this.setState({ stepCounter: count });


                this.setState({ choosenQuestionId: 0 });
                this.setState({ replyText: '' });
               this.setState({ isNextBtnHidden: true });
               this.setState({ isPrevBtnHidden: true });
                this.setState({ isEntryBtnHidden: true });

                this.setState({ isRadioBtnDisabled: false });

                this.checkIfLastQuestionOfRound();

           }



      }


       
       
       
       prevQuestion(event: any) {
           let count = this.state.stepCounter -1;
           this.setState({ stepCounter: count });


           this.setState({ choosenQuestionId: 0});
           this.setState({ replyText: '' });
           this.setState({ isNextBtnHidden: true });
           this.setState({ isPrevBtnHidden: true });
           this.setState({ isEntryBtnHidden: true });

           this.setState({ isRadioBtnDisabled: false });

           this.checkIfFirstQuestionOfRound();

       }
       




       //ansänvds för att ta fram sida där man skall lägga till en fråga
    addQuestionArea(event: any) {
        this.setState({ isToAddQuestionButtonVisible: false });
        this.setState({ isToEditQuestionButtonVisible: false });
        this.setState({ isNextBtnHidden: false });
        this.setState({ isPrevBtnHidden: false });
        this.setState({ isEntryBtnHidden: false });
        this.setState({ isRadioBtnDisabled: true });
        this.setState({ isMainAreaVisible: false });
        this.setState({ isAddQuestionAreaVisible: true })
        this.setState({ isEditQuestionAreaVisible: false })
    }





       

        // samma som ovan fast för att ändra en fråga
       EditQuestionArea(event: any) {
           this.setState({ isToAddQuestionButtonVisible: false });
           this.setState({ isToEditQuestionButtonVisible: true });
           this.setState({ isNextBtnHidden: false });
           this.setState({ isPrevBtnHidden: false });
           this.setState({ isEntryBtnHidden: false });
           this.setState({ isRadioBtnDisabled: true });
           this.setState({ isMainAreaVisible: false });
           this.setState({ isAddQuestionAreaVisible: false })
           this.setState({ isEditQuestionAreaVisible: true })

           //fen

           this.state.questions.length + 1;

       }







       //används för att komma tillbaka till sidan med frågorna
    returnToMainArea(event: any) {
        let count = this.state.stepCounter;

        let questionUpdate = this.state.questions;
        this.setState({ questions: questionUpdate });

       this.setState({ isAddQuestionAreaVisible: false });
        this.setState({ isEditQuestionAreaVisible: false });
        this.setState({ isMainAreaVisible: true });

        this.setState({ replyText: '' });
        this.setState({ isRadioBtnDisabled: false });
        this.setState({ isEntryBtnHidden: true });
        this.setState({ isNextBtnHidden: true });
        this.setState({ isPrevBtnHidden: true });
        this.setState({ isToAddQuestionButtonVisible: true });
        this.setState({ isToEditQuestionButtonVisible: true });

        console.log('Return to main area');
    }


       


       public deleteQuestion() {
       
           if (this.state.stepCounter == this.state.questions.length-1) {  //så man inte hamnar utanför arrayen
               this.setState({ replyText: "OBSERVERA, Du tog NU bort sista frågan!" })
           }
           

                 try {
                      fetch('api/Questions/' + this.state.questions[this.state.stepCounter].id, { method: 'delete' })
                          .then(data => {
                              this.setState({
                                  questions: this.state.questions.filter((q) => {
                                      return (q.id != this.state.questions[this.state.stepCounter].id);
                                  })
                              });

                          });
                  } catch (e) {
                      console.log("Error", e)
                  }


       }





       

       
       refreshAdminQuestionData() {

           fetch('api/Questions')
               .then(response => response.json() as Promise<Question[]>)
               .then(data => {
                   console.log("refreshAdminQuestionData at parent, array-length", data.length);
                   this.setState({ questions: data, loading: true });
                   
                   }

               )
               .catch(message => { console.log('Error' + message); });

                


       }







}  //class ends here


