import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface INavMenuState {
    isAdmin: boolean;
    loading: boolean;
}

export class NavMenu extends React.Component<{}, INavMenuState> {
    public constructor() {
        super();
        this.state = {
            isAdmin: false,
            loading: true
        }

        this.fetchUser = this.fetchUser.bind(this);
    }

    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>QuizApp</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/HighScores'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> HighScore
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Quiz'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Quiz
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Questions'} exact activeClassName='active'><span className='glyphicon glyphicon-education'></span>Questions</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }

    fetchUser() {
        fetch("api/Admin/GetUser")
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isAdmin: data,
                    loading: false
                });
            })
            .catch(error => { console.log("error: ", error) });
    }

    componentDidMount() {
        this.fetchUser();
    }
    
}
