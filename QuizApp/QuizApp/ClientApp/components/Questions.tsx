import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { parsePath } from 'history/PathUtils';

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
                        <td><NavLink to={'/Edit'} exact activeClassName='active'>Edit</NavLink></td>
                        <td><a className="action" onClick={(id) => this.RemoveQuestion(q.id)}>Delete</a></td>
                    </tr>)}
            </tbody>
        </table>
    }

    public fetchQuestions() {
        fetch("api/Questions/GetQuestions")
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
        return <div>
            <ul className='nav navbar-nav' style={{ display: "block" }}>
                <li>
                    Question:<input id="content" type="text" placeholder="content"/>
                </li>
                <li>
                    Time:<input id="time" type="text" placeholder="time" />
                </li>
                <li>Answer:<input id="answer" name="Answer"/>
                    <input type="checkbox" name="isTrue" id="isTrue" />
                    <div id="addAnswers"></div>
                    <button onClick={this.AddMoreAnswers}>+</button>
                </li>
                <li><a className="action" onClick={this.AddQuestion}>Add</a></li>
            </ul>       
        </div>
    }

    public alternativeFilter(Id: number) {
        const alternatives: Alternative[] = this.state.Alternatives.filter(a => a.questionId == Id);
        if (alternatives.length < 1) return <br/>;

        return alternatives.map(f =>
            <div key={f.id}>{f.content} {f.isTrue}</div>
        );
    }

    public AddMoreAnswers(event: any) {
        let newAnswer = <li>Answer:<input id="answer" name="Answer" /><input type="checkbox" name="istrue" id="istrue" /></li>
        (document.getElementById("addAnswers") as HTMLDivElement).innerHTML += newAnswer;
    }

    //public AddAlternatives() {
    //    let answers: string[] = (document.getElementsByName("answer"));
    //    let isTrue: boolean[] = (document.getElementsByName("isTrue"));

    //    let alternatives: Alternative[] = new Alternative();

    //    for (let i = 0; i < answers.length; i++) {
    //        let alternative = new Alternative();
    //        alternative.content = answers[i];
    //        alternative.isTrue = isTrue[i];
    //    }

    //    alternatives.forEach(function (alt) {
    //        fetch("api/Alternatives/" + alt, { method: "post" })
    //            .then()
    //    });
    //}

    public AddQuestion() {
        let time: number = parseInt((document.getElementById("time") as HTMLInputElement).value);
        let content: string = (document.getElementById("content") as HTMLInputElement).value;
        

        let question = new Question();
        question.time = time;
        question.content = content;

        fetch("api/Questions/" + question, { method: "post" })
            .then(Response => Response.json() as Promise<Question>)
            .then(data => {
                console.log(data);
                this.setState({
                    Questions: this.state.Questions.filter((rec) => {
                        return (rec.id == question.id);
                    })
                });
            })
            .catch(error => { console.log("error: ", error) });
        return question;
    }

    public RemoveQuestion(Id: number) {
        fetch('api/Questions/' + Id, {method: 'delete' })
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
