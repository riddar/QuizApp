import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IHighScoresProps {}

interface IHighScoresState {
    Scores: [{ Id: number, Points: number, Date: string, TimeTaken: number }],
    HasFetchedData: boolean;
}

export class HighScores extends React.Component<RouteComponentProps<IHighScoresProps>, IHighScoresState> {
    public constructor(props: RouteComponentProps<IHighScoresProps>) {
        super(props);
        this.state = {
            Scores: [
                { Id: 1, Points: 5, Date: "", TimeTaken: 52 },
                { Id: 2, Points: 10, Date: "", TimeTaken: 24 },
                { Id: 3, Points: 7, Date: "", TimeTaken: 37 }
            ],
            HasFetchedData: false
        }
    }

    public render() {
        let scores = this.state.Scores;   
        let info = <div className="info"></div>;

        if (!this.state.HasFetchedData)
            info = <div className="info">...loading</div>;
        else if (this.state.HasFetchedData && scores.length > 0)
            info = <div className="info">Scores Found</div>;
        else
            info = <div className="info">No scores found!</div>;

        return (<div className="ScoreInfo">
            <h1>HighScores</h1>
            <h4>{info}</h4>
            {scores.forEach(function (value) {
                value.Id;
            })}
        </div>)
    }

    fetchHighScores() {
        fetch("api/Scores")
            .then(data => {
                console.log("Gethighscores: ", data);
                return data.json();
            })
            .then(json => {
                this.setState({
                    HasFetchedData: true
                })
                console.log("json: ", json);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

    componentDidMount() {
        this.fetchHighScores();
    }
}
