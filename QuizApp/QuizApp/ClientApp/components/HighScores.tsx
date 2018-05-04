import * as React from 'react';

interface IHighScoresProps {}

interface IHighScoresState {
    Scores: [{ Id: number, Points: number, Date: string, TimeTaken: number }],
    HasFetchedData: boolean;
}

export class HighScores extends React.Component<IHighScoresProps, IHighScoresState> {
    public constructor(props: IHighScoresProps) {
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

        <h1>HighScores</h1>
        let info = <div className="info"></div>;

        if (!this.state.HasFetchedData)
            info = <div className="info">...loading</div>;
        else if (this.state.HasFetchedData && scores.length > 0)
            info = <div className="info">Scores Found</div>;
        else
            info = <div className="info">No scores found!</div>;

        return (<div className="ScoreInfo">
            {info}
            {scores.forEach(function (value) {
                console.log(value.Id);
                value.Id;
            })}
        </div>)
    }



    fetchHighScores() {
        fetch("api/Scores")
            .then(data => {
                console.log("gethighscores: ", data);
                return data.json();
            })
            .then(json => {
                console.log("json: ", json);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }
}
