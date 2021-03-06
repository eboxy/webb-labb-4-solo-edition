﻿import * as React from 'react';
import { render } from 'react-dom';
import { Component, EventHandler } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Question } from './AdminQuestions'



interface EditQuizQuestionProps {

    id: number;
    _question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    rightAnswer: string;
    refreshAdminQuestionData: Function;

}








interface EditQuizQuestionState {


    id: number;
    _question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    rightAnswer: string;
    hasFetchedData: boolean;
    loading: boolean
    
  }









export class EditQuestion extends React.Component<EditQuizQuestionProps, EditQuizQuestionState> {
    public constructor(props: EditQuizQuestionProps) {
        super(props);
        this.state = {
            id: 0,
            _question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            rightAnswer: "",
            hasFetchedData: false,
            loading: false
       };
            


        this.changeQuestion = this.changeQuestion.bind(this);
        this.changeAnswer1 = this.changeAnswer1.bind(this);
        this.changeAnswer2 = this.changeAnswer2.bind(this);
        this.cangeAnswer3 = this.cangeAnswer3.bind(this);
        this.rightAnswer = this.rightAnswer.bind(this);

        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.refreshEditQuestionData = this.refreshEditQuestionData.bind(this);

        this.runAsyncMethods = this.runAsyncMethods.bind(this);
         this.runOtherMethod = this.runOtherMethod.bind(this);

    }


    



    runOtherMethod() {

        this.runAsyncMethods(Function);
    }


    //köra funktionera i rätt ordning så att allt uppdateras som det skall
    runAsyncMethods(callback: any) {

        setTimeout(() => callback(this.UpdateQuestion()), 0);

        setTimeout(() => callback(this.refreshEditQuestionData()), 500);

        setTimeout(() => callback(this.props.refreshAdminQuestionData()), 600);

    }






    componentWillReceiveProps() {


        this.setState({ id: this.props.id });

        this.setState({ _question: this.props._question });

        this.setState({ answer1: this.props.answer1 });

        this.setState({ answer2: this.props.answer2 });

        this.setState({ answer3: this.props.answer3 });

        this.setState({ rightAnswer: this.props.rightAnswer });

     }








    public render() {
        return (
            <div className="list-group">
                <h1 className="questionLabel"><span className="questheadercolor">Ändra en fråga</span></h1>

                <div className="AddQuestion">
                    <label id="questionlabel"><h3><span className="questitemcolor">Fråga</span></h3></label>

                    <input
                        id="questiontextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state._question}
                        onChange={this.changeQuestion} />
                </div>

                <div className="Answer">
                    <label id="lablealternative1"><h3><span className="questitemcolor">Alternativ 1</span></h3></label>

                    <input
                        id="alternative1textbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.answer1}
                        onChange={this.changeAnswer1} />
                </div>

                <div className="Answer">
                    <label id="lablealternative2"><h3><span className="questitemcolor">Alternativ 2</span></h3></label>

                    <input
                        id="alternative2textbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.answer2}
                        onChange={this.changeAnswer2} />
                </div>

                <div className="Answer">
                    <label id="lablealternative3"><h3><span className="questitemcolor">Alternativ 3</span></h3></label>

                    <input
                        id="alternative3textbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.answer3}
                        onChange={this.cangeAnswer3}
                    />
                </div>


                <div className="RightAnswer">
                    <label id="lablerightanswer"><h3><span className="questitemcolor">Rätt svar</span></h3></label>

                    <input
                        id="rightanswertextbox"
                        className="textBox"
                        type="text"
                        placeholder=""
                        value={this.state.rightAnswer}
                        onChange={this.rightAnswer} />
                </div>

                <button id="btnAddQuestion" className="btm btn-success btn-lg" onClick={this.runOtherMethod}>Ändra frågan</button>



            </div>


        )








    }    //render ends here






    //reduant kod ja, men kom inte på ett sätt att kunna använda properties som metod-argument


    changeQuestion(event: any) {

        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9? ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ _question: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ _question: event.target.value })
        }
    }



    changeAnswer1(event: any) {

        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9? ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ answer1: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ answer1: event.target.value })
        }
    }



    changeAnswer2(event: any) {
        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9? ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ answer2: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ answer2: event.target.value })
        }
    }





    cangeAnswer3(event: any) {
        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9? ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ answer3: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ answer3: event.target.value })
        }
    }



    rightAnswer(event: any) {
        const regexOnlyAlphanumveric = /[^a-öA-Ö0-9? ]/g;
        if (event.target.value == "" || regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ rightAnswer: '' })
        }
        else if (!regexOnlyAlphanumveric.test(event.target.value)) {
            this.setState({ rightAnswer: event.target.value })
        }
    }







    UpdateQuestion() {

        fetch('api/Questions/UpdateQuestion?id=' + this.state.id + '&_question=' + this.state._question + '&answer1=' + this.state.answer1 + '&answer2=' + this.state.answer2 + '&answer3=' + this.state.answer3 + '&rightAnswer=' + this.state.rightAnswer)

            .then(Response => Response.json() as Promise<Question>)
            
            .then(data => {
                console.log("UpdateQuestion fired: ", data);
                
                this.setState({
                    hasFetchedData: false,
                    _question: "",
                    answer1: "",
                    answer2: "",
                    answer3: "",
                    rightAnswer: ""
                    
                })
            })


            .catch(message => { console.log('Error' + message); });

       
    }






    refreshEditQuestionData() {

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                console.log("refreshEditQuestionData has fired, array-length", data.length);
                this.setState({ loading: true });
                
                }

            )
            .catch(message => { console.log('Error' + message); });
    }






}    //class ends here






