import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>QuizApp</h1>

            <NavLink to={'/Quiz'} exact activeClassName='active'>
                <button>Start Quiz</button> 
            </NavLink>
        </div>;
    }
}
