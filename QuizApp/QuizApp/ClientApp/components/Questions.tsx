import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
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
                        {this.alternativeFilter(q.id)}
                    </tr>)}
            </tbody>
        </table>
    }

   public renderQuestionAdd() {
        return <div>
            <h4>Add/Update/Delete Question</h4>
            <ul className='nav navbar-nav'>
                <li>Question:<input type="text" placeholder="Question" /></li><br />
                <li>CorrectAnswer:<input placeholder="Answer" /></li><br />
                <li>WrongAnwer:<input placeholder="Wrong" /></li><br />
                <li><button onclick={this.PostQuestion}>Submit</button></li>
            </ul>
        </div>
    }

    public fetchQuestions() {
        fetch("api/Questions")
            .then(Response => Response.json() as Promise<Question[]>)
            .then(data => {
                console.log(data);
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
                console.log(data);
                this.setState({
                    Alternatives: data,
                    loading: false
                });
            })
            .catch(error => { console.log("error: ", error) });
    }

    public alternativeFilter(Id: number) {
        this.state.Alternatives.map(a => {
            if (a.questionId == Id) {
                <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.content}</td>
                    if (a.isTrue) {
                        <span className='react-icons/lib/fa/check-square-o'><td>{a.isTrue}</td></span>
                    }
                    else {
                        <span className='react-icons/lib/fa/circle-thin'><td>{a.isTrue}</td></span>
                    }
                </tr>
            }
        });
    }

    public PostQuestion(event: any) {
        let question = { content, time, Scores, Alternatives };
        fetch("api/Questions/", { method: "Post", body: question })
            .then(Response => Response.json() as Promise<Question>)
            .then(json => {
                console.log(json);
            })
            .catch(error => { console.log("error: ", error) });
        return question;
    }

    componentDidMount() {
        this.fetchQuestions();
        this.fetchAlternatives();
    }
}
