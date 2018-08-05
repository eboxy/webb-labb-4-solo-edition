import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                      </button>
                    <Link className='navbar-brand' to={'/'}>Quiz</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        
                        <li>
                            <NavLink to={'/Quiz'} activeClassName='active'>
                                <span className='glyphicon glyphicon-list-alt'></span> Quiz
                            </NavLink>
                        </li>
                         <li>
                            <NavLink to={ '/HighScore' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Topplistan
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/AdminQuestions'} activeClassName='active'>
                                <span className='glyphicon glyphicon-pencil'></span> Admin Fragor
                            </NavLink>
                        </li>



                    </ul>
                </div>
            </div>
        </div>;
    }
}
