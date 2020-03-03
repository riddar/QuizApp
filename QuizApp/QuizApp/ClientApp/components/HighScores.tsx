import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IHighScoresState {
    Scores: Score[];
    loading: boolean;
}

class Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
    userId: string;
}

export class HighScores extends React.Component<RouteComponentProps<{}>, IHighScoresState> {
    constructor() {
        super();
        this.state = { Scores: [], loading: true };

        fetch("api/Scores")
            .then(response => response.json() as Promise<Score[]>)
            .then(data => {
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
        let scoresGroupedByUserId: Score[] = scores.reduce<Score[]>((accumulator, currentValue) => {
            if (accumulator.filter(s => s.userId == currentValue.userId).length > 0) {
                const tempScore = accumulator.filter(s => s.userId == currentValue.userId)[0] || new Score();
                tempScore.points += currentValue.points;
                tempScore.timeTaken += currentValue.timeTaken;
            }
            else if (accumulator.filter(s => s.userId == currentValue.userId).length <= 0) {
                accumulator.push(currentValue);
            }

            return accumulator
        },[]);

        return <table className='table'>
            <thead>
                <tr>
                    <th>Points</th>
                    <th>TimeTaken</th>
                    <th>Date</th>
                    <th>UserId</th>
                </tr>
            </thead>
            <tbody>
                {scoresGroupedByUserId.sort(s => s.points).map(s =>
                    <tr key={s.userId}>
                        <td>{s.points}</td>
                        <td>{s.timeTaken}</td>
                        <td>{s.date}</td>
                        <td>{s.userId}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}