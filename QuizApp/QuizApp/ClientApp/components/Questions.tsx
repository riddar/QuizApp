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

interface IQuestionsState {
    Questions: Question[];
    Alternatives: Alternative[];
    loading: boolean;
}

export class Questions extends React.Component<RouteComponentProps<{}>, IQuestionsState> {
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
            : this.renderQuestionsTable(this.state.Questions, this.state.Alternatives)

        let contents2 = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderQuestionAdd();

        return <div>
            <h1>Questions</h1>
            {contents}
            {contents2}      
        </div>
    }

    public renderQuestionsTable(Questions: Question[], Alternatives: Alternative[]) {
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
                        <td>{this.alternativeFilter(q.id)}</td>
                        <td><NavLink to={'/Edit'} exact activeClassName='active'><a>Edit</a></NavLink></td>
                        <td><a className="action" onClick={(id) => this.RemoveQuestion(q.id)}>Delete</a></td>
                    </tr>)}
            </tbody>
        </table>
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

    public renderQuestionAdd() {
        let question: Question;

        return <div>
            <ul className='nav navbar-nav'>
                <li>
                    Question:<input id="question" type="text" placeholder="Question" />
                </li><br /><br />
                <li>Answer:<input id="" placeholder="Answer" />
                    <input type="checkbox" name="istrue" id="istrue"/>
                    <button>+</button>
                </li><br />
                <td><a className="action" onClick={(id) => this.AddQuestion(question)}>Add</a></td>
            </ul>
        </div>
    }

    public alternativeFilter(Id: number) {
        const alternatives: Alternative[] = this.state.Alternatives.filter(a => a.questionId == Id);
        if (alternatives.length < 1) return <br/>;

        return alternatives.map(f =>
            <tr key={f.id}>
                <td>{f.id}</td>
                <div>{f.content}</div>
                <div>{f.isTrue}</div>
            </tr>
        );
    }

    public AddQuestion(question: Question) {
        fetch("api/Questions/", { method: "Post", body: question })
            .then(Response => Response.json() as Promise<Question>)
            .then(json => {
                console.log(json);
            })
            .catch(error => { console.log("error: ", error) });
        return question;
    }

    public RemoveQuestion(Id: number) {
        fetch('api/Questions/Delete/' + Id, {method: 'post' })
            .then(data => {
            this.setState({
                    Questions: this.state.Questions.filter((rec) => {
                        return (rec.id != Id);

                    })
                });
        });  
    }

    componentDidMount() {
        this.fetchQuestions();
        this.fetchAlternatives();
    }
}
