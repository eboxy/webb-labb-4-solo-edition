import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import { Quiz } from './Quiz';



interface ScoreState {
    loading: boolean;
    PointState: Scores[];
}

interface Scores {
    id: number;
    points: number;
    player: string;
}




export class Test extends React.Component<RouteComponentProps<{}>, ScoreState> {
    constructor() {
        super();
        this.state = {
            loading: false,
            PointState: []

        };


        
    }



    public render() {
        return <div>

            

            <div id="testbgcolor">

            <button  className="btn-pill btn-success btn-lg GreenBtn"
                 id="svarsbutton"> Svara </button>

            <button className="btn-pill btn-danger btn-lg GreenBtn"
                type="button">Nästa</button>


                

                {/*
                        <Quiz/>
                 */}
            
                
            <button
                className="btn-pill btn-warning btn-lg GreenBtn" type="button"
                 id="resultatbutton">Se Resultat</button>

            </div>



        </div>;
    }
}