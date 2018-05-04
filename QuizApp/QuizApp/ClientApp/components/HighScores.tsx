import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IHighScoresState {
    Scores: Score[];
    HasFetchedData: boolean;
}



export class HighScores extends React.Component<RouteComponentProps<{}>, IHighScoresState> {
    constructor() {
        super();
        this.state = { Scores: [], HasFetchedData: true };

        fetch("api/Scores")
            .then(response => response.json() as Promise<Score[]>)
            .then(data => {
                console.log(data);
                this.setState({ Scores: [], HasFetchedData: false });
            });
    }

    public render() {
        let contents = this.state.HasFetchedData
            ? <p><em>Loading...</em></p>
            : HighScores.renderHighScoresTable(this.state.Scores);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>;
    }

    private static renderHighScoresTable(scores: Score[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Points</th>
                    <th>TimeTaken</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {scores.map(s =>
                    <tr key={s.Id}>
                        <td>{s.Points}</td>
                        <td>{s.TimeTaken}</td>
                        <td>{s.Date}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Score {
    Id: number;
    Points: number;
    Date: string;
    TimeTaken: number;
    HasFetchedData: boolean;
}