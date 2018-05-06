import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IHighScoresState {
    Scores: Score[];
    loading: boolean;
}

interface Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
    HasFetchedData: boolean;
}

export class HighScores extends React.Component<RouteComponentProps<{}>, IHighScoresState> {
    constructor() {
        super();
        this.state = { Scores: [], loading: true };

        fetch("api/Scores")
            .then(response => response.json() as Promise<Score[]>)
            .then(data => {
                console.log(data);
                this.setState({ Scores: data, loading: false });
            })
            .catch(error => { console.log("error: ", error) });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : HighScores.renderHighScoresTable(this.state.Scores);

        return <div>
            <h1>HighScore</h1>
            {contents}
        </div>;
    }

    private static renderHighScoresTable(scores: Score[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Points</th>
                    <th>TimeTaken</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {scores.map(s =>
                    <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.points}</td>
                        <td>{s.timeTaken}</td>
                        <td>{s.date}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}