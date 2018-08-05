import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';


interface ScoreProps {
}

interface ScoreState {
    loading: boolean;
    PointState: Scores[];
}

interface Scores {
    id: number;
    points: number;
    player: string;
}




export class HighScore extends React.Component<RouteComponentProps<{}>, ScoreState> {
    constructor() {
        super();
        this.state = {
            loading: false,
            PointState: []

        };


        fetch('api/Scores')
            .then(response => response.json() as Promise<Scores[]>)
            .then(data => {
                this.setState({ PointState: data, loading: true });
            });
        
    }

    public render() {


        let contents = this.state.loading
            ? this.renderScoresTable(this.state.PointState)
            : <p><em>Loading...</em></p>;


        return <div> {contents} </div>;
    }

    public renderScoresTable(PointState: Scores[]) {

        return <table className="table table-striped">
            <thead>
                <tr className="questheadercolor">
                    <th></th>
                    <th  scope="col"><h3>Poäng</h3></th>
                    <th  scope="col"><h3>Spelare</h3></th>
                </tr>
            </thead>

            <tbody>
                {PointState.map(item =>
                    <tr key={item.id}>
                        <td></td>
                        <td>{item.points}</td>
                        <td>{item.player}</td>
                    </tr>
                )}
            </tbody>
        </table>
    }







}


