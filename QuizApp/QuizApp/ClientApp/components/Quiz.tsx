import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { HighScores } from 'ClientApp/components/HighScores';

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
    Scores: Score[];
    Questions: Question[];
    Alternatives: Alternative[];
    loading: boolean;
}

export class Quiz extends React.Component<RouteComponentProps<{}>, IQuizState> {
    public constructor() {
        super();
        this.state = {
            Scores: [],
            Questions: [],
            Alternatives: [],
            loading: true
        }

        this.fetchScores = this.fetchScores.bind(this);
        this.fetchRandomQuestions = this.fetchRandomQuestions.bind(this);
        this.fetchAlternatives = this.fetchAlternatives.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderQuizTable(this.state.Questions, this.state.Alternatives)

        return <div>
            <h1>Quiz</h1>
            {contents}
            <button onClick={this.GetAllAnswers}>submit</button>
        </div>
    }

    public renderQuizTable(Questions: Question[], Alternatives: Alternative[]) {
        return Questions.map(q =>
            <table key={q.id} id={"question: " + q.id.toString()}>
                <thead>
                    <tr>
                        <th><h2>{q.content}</h2></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>{this.alternativeFilter(q.id)}</tr>
                </tbody>
            </table>
        );
    }

    public fetchScores() {
        fetch("api/Scores")
            .then(Response => Response.json() as Promise<Score[]>)
            .then(data => {
                //console.log(data);
                this.setState({
                    Scores: data,
                    loading: false
                });
            })
            .catch(error => { console.log("error: ", error) });
    }

    public fetchRandomQuestions() {
        fetch("api/Questions/GetRandomQuestions")
            .then(Response => Response.json() as Promise<Question[]>)
            .then(data => {
                //console.log(data);
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
        if (alternatives.length < 1) return <td></td>;

        return alternatives.map(a =>
            <td key={a.id}>
                <label><input type="radio" name={Id.toString()} id={a.id.toString()}></input>{a.content}</label>
            </td>
        );
    }

    public GetAllAnswers() {
        const alternatives: Alternative[] = this.state.Alternatives;
        var radios = document.getElementsByTagName('input');

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].type == 'radio') {
                var Id = parseInt(radios[i].id);
                console.log(alternatives.filter(a => a.id == Id));
            }
        }
    }

    public AddScore(questionId: number) {
        fetch("api/Questions/" + questionId, { method: "post" })
            .then(Response => Response.json() as Promise<Score[]>)
            .then(data => {
                this.setState({
                    Scores: data,
                    loading: false
                });
            })
            .catch(error => { console.log("error: ", error) });
    }

    componentDidMount() {
        this.fetchScores();
        this.fetchRandomQuestions();
        this.fetchAlternatives();
    }
}
