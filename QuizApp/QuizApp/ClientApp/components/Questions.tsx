/// <reference path="highscores.tsx" />
/// <reference path="navmenu.tsx" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
}

interface Alternative {
    id: number;
    content: string;
    isTrue: boolean;
    question: Question;
}

interface Question {
    id: number;
    time: number;
    content: string;
    Scores: Score[];
    Alternatives: Alternative[];
}

interface IQuestionsState {
    Questions: Question[];
    Alternatives: Alternative[];
    loading: boolean;
}

export class Questions extends React.Component<RouteComponentProps<{}>, IQuestionsState> {
    constructor() {
        super();
        this.state = { Questions: [], Alternatives: [], loading: true }

        fetch("api/Questions")
            .then(Response => Response.json() as Promise<Question[]>)
            .then(data => {
                console.log(data);
                this.setState({ Questions: data, loading: false });
            })
            .catch(error => { console.log("error: ", error) });

        fetch("api/Alternatives")
            .then(Response => Response.json() as Promise<Alternative[]>)
            .then(data => {
                console.log(data);
                this.setState({ Alternatives: data, loading: false });
            })
            .catch(error => { console.log("error: ", error) });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Questions.renderQuestionsTable(this.state.Questions, this.state.Alternatives);

        return <div>
            <h1>Questions</h1>
            {contents}
        </div>
    }

    private static renderQuestionsTable(Questions: Question[], Alternatives: Alternative[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Content</th>
                    <th>Time</th>
                    <th>Alternatives</th>
                </tr>
            </thead>
            <tbody>
                {Questions.map(q =>
                    <tr key={q.id}>
                        <td>{q.id}</td>
                        <td>{q.content}</td>
                        <td>{q.time}</td>
                        <td>{q.Alternatives}</td>
                    </tr>
                )}
            </tbody>
        </table>
    }
}
