import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Route } from 'react-router-dom';
import { HighScores } from 'ClientApp/components/HighScores';
import { Questions } from 'ClientApp/components/Questions';

class Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
    questionId: number;
    userId: string;
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
    correct: boolean;
    answeredPoints: number;
    clicked: number;
    count: number;
}

export class Quiz extends React.Component<RouteComponentProps<{}>, IQuizState> {
    public constructor() {
        super();
        this.state = {
            Scores: [],
            Questions: [],
            Alternatives: [],
            loading: true,
            correct: false,
            answeredPoints: 0,
            clicked: 0,
            count: 0
        }

        this.fetchScores = this.fetchScores.bind(this);
        this.fetchRandomQuestions = this.fetchRandomQuestions.bind(this);
        this.fetchAlternatives = this.fetchAlternatives.bind(this);
        this.alternativeFilter = this.alternativeFilter.bind(this);
        this.GetAllAnswers = this.GetAllAnswers.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderQuizTable(this.state.Questions, this.state.Alternatives)

        return <div>
            <h1>Quiz</h1>
            <input type="hidden" id="time" defaultValue="0" />
            {contents}
            {this.TrueOrFalse()}
        </div>
    }

    public TrueOrFalse() {

        if (this.state.clicked.valueOf() <= 0) {
            return <button id="questsubbutton" onClick={this.GetAllAnswers}>Submit</button>
        }
        else if (this.state.count.valueOf() >= 3) {
            return <div>
                <h4>Points: {this.state.answeredPoints.valueOf()}</h4>
                <NavLink to={'/HighScores'} exact activeClassName='active'><button>Start Quiz</button></NavLink>
            </div>
        }
        else if (this.state.clicked.valueOf() >= 0) {
            return <div>
                <p>The answer was: {String(this.state.correct.valueOf())}</p>
                <button onClick={this.reloadPage}>Next Question</button>

            </div>
        }
    }

    public reloadPage() {
        this.setState({
            Scores: [],
            Questions: [],
            Alternatives: [],
            loading: true,
            correct: false,
            clicked: 0,
        });

        this.fetchScores();
        this.fetchRandomQuestions();
        this.fetchAlternatives();
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
                   <tr className="inline-block col-md-12" >{this.alternativeFilter(q.id)}</tr>
                </tbody>
            </table>
        );
    }

    public fetchScores() {
        fetch("api/Scores")
            .then(Response => Response.json() as Promise<Score[]>)
            .then(data => {
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

    public getTotalTime(Questions: Question[]) {
        let QuestionsGroupedByUserId: Question[] = [];
        let time: number = 0;
        Questions.map(q =>
            time += q.time
        );

        return time;
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
        var radios = document.getElementsByTagName('input');
        const alternatives: Alternative[] = this.state.Alternatives;
        var userId = (document.getElementById("UserId") as HTMLInputElement);

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].type == 'radio') {
                let Id = parseInt(radios[i].id);
                let alternative = alternatives.filter(a => a.id == Id)[0];

                if (alternative.isTrue.valueOf() == radios[i].checked.valueOf() && radios[i].checked.valueOf() == true) {
                    let score = new Score();
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    score.date = mm + '/' + dd + '/' + yyyy;
                    score.questionId = alternative.questionId;
                    score.timeTaken = 0;
                    score.points = 1;
                    score.userId = String(userId.dataset.id);
                    this.AddScore(score);
                    this.setState({
                        answeredPoints: this.state.answeredPoints + 1,
                        clicked: this.state.clicked + 1,
                        count: this.state.count + 1,
                        correct: true
                    });
                }
                else {
                    this.setState({
                        clicked: this.state.clicked + 1,
                        count: this.state.count + 1,
                    });
                }
            }
        }
    
        { console.log("points: ", this.state.answeredPoints) }

        { console.log("count: ", this.state.count) }
    }

    public AddScore(score: Score) {
        fetch("api/Scores/CreateScore?points=" + score.points + "&timeTaken=" + score.timeTaken + "&questionId=" + score.questionId + "&userId=" + score.userId)
            .then(Response => Response.json() as Promise<Score>)
            .then(data => {
            })
            .catch(error => { console.log("error: ", error) });
    }

    componentDidMount() {
        this.fetchScores();
        this.fetchRandomQuestions();
        this.fetchAlternatives();
    }
}
