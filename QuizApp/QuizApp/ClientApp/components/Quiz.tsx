import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

class Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
    questionId: number;
}

class Alternative {
    id: number;
    content: string;
    isTrue: boolean;
    question: Question;
    questionId: number;
}

class Question {
    id: number;
    time: number;
    content: string;
    Scores: Score[];
    Alternatives: Alternative[];
}

interface IQuizState {
    Questions: Question[];
    Alternatives: Alternative[];
    loading: boolean;
}

export class Quiz extends React.Component<RouteComponentProps<{}>, IQuizState> {
    public constructor() {
        super();
        this.state = {
            Questions: [],
            Alternatives: [],
            loading: true
        }

        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.fetchAlternatives = this.fetchAlternatives.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderQuizTable(this.state.Questions, this.state.Alternatives)

        return <div>
            <h1>Questions</h1>
            {contents}
        </div>
    }

    public renderQuizTable(Questions: Question[], Alternatives: Alternative[]) {
        return Questions.map(q =>
            <table key={q.id}>
                <thead>
                    <th>{q.content}</th>
                </thead>
                <tbody>
                    {this.alternativeFilter(q.id)}
                </tbody>
            </table>
        );
    }



    public fetchQuestions() {
        fetch("api/Questions")
            .then(Response => Response.json() as Promise<Question[]>)
            .then(data => {
                this.setState({
                    Questions: data,
                    loading: false
                });
            })
            .catch(error => { console.log("error: ", error) });
    }

    public fetchAlternatives() {
        fetch("api/Alternatives")
            .then(Response => Response.json() as Promise<Alternative[]>)
            .then(data => {
                this.setState({
                    Alternatives: data,
                    loading: false
                });
            })
            .catch(error => { console.log("error: ", error) });
    }

    public alternativeFilter(Id: number) {
        const alternatives: Alternative[] = this.state.Alternatives.filter(a => a.questionId == Id);
        if (alternatives.length < 1) return <br/>;

        return alternatives.map(f =>
            <tr key={f.id}>
                <div>{f.content}</div>
                <div><input type="radio" name="istrue" id="istrue" /></div>
            </tr>
        );
    }

    public AddScore(alternative: Alternative) {
        fetch("api/Score/", { method: "Post", body: alternative })
            .then(Response => Response.json() as Promise<Alternative>)
            .then(json => {
                console.log(json);
            })
            .catch(error => { console.log("error: ", error) });
        return alternative;
    }

    componentDidMount() {
        this.fetchQuestions();
        this.fetchAlternatives();
    }
}
