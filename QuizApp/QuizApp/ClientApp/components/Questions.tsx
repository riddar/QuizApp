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
        this.AddQuestion = this.AddQuestion.bind(this);
        this.AddAlternatives = this.AddAlternatives.bind(this);
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
                        <td className="strongText">{q.id}</td>
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
                <li className="col-md-12">
                    Question: <input id="content" type="text" placeholder="content" />
                </li>
                <li className="col-md-12"> 
                    Time: <input id="time" type="text" placeholder="time" />
                </li>
                <li className="col-md-12">
                    Answer: <input id="answers" name='Answers' />
                    <input  id="istrue" type='checkbox' name='isTrue' /></li>
                <div id="addAnswers" className="col-md-12"></div>
                 <button onClick={this.AddMoreAnswers}>+</button>
                <li><a className="action" onClick={this.AddQuestion}>Add</a></li>
            </ul>       
        </div>
    }

    public alternativeFilter(Id: number) {
        const alternatives: Alternative[] = this.state.Alternatives.filter(a => a.questionId == Id);
        if (alternatives.length < 1) return <br/>;

        return alternatives.map(f =>
            <div key={f.id}>{f.content}<input type="checkbox" checked={f.isTrue} /></div>
        );
    }

    public AddMoreAnswers(event: any) {
        let newAnswer = "<li>Answer:<input id='addmoreanswers' name='Answers' /><input  id='addmoreanswerscheckbox'  type='checkbox' name='isTrue' /></li>";
        console.log("answers: " + document.getElementsByName("Answers").length);
        console.log("isTrue: " + document.getElementsByName("isTrue").length);
        (document.getElementById("addAnswers") as HTMLDivElement).innerHTML += newAnswer;
    }

    public AddAlternatives(questionId: number) {
        for (let i = 0; i < document.getElementsByName("Answers").length; i++) {
            let answer: string = (document.getElementsByName("Answers")[i] as HTMLInputElement).value;
            let isTrue: boolean = (document.getElementsByName("isTrue")[i] as HTMLInputElement).checked.valueOf();
            fetch("api/Alternatives/CreateAlternative?Content=" + answer + "&isTrue=" + isTrue + "&questionId=" + questionId)
                .then(Response => Response.json() as Promise<Alternative>)
                .catch(error => { console.log("error: ", error) });
        }
    }

    public AddQuestion() {
        let time: number = parseInt((document.getElementById("time") as HTMLInputElement).value);
        let content: string = (document.getElementById("content") as HTMLInputElement).value;
        
        fetch("api/Questions/CreateQuestion?time=" + time + "&content=" + content)
            .then(Response => Response.json() as Promise<Question>)
            .then(data => {
                console.log(data.id);
                this.AddAlternatives(data.id);
            })
            .catch(error => { console.log("error: ", error) });
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
