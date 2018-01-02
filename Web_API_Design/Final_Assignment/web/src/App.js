/**
 * This app lets a user save their favorite retro games.
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */


import React, {Component} from 'react';
import './App.css';
import UserForm from "./LoginForm";
import PersonalGamePage from "./PersonalGamePage";
import Signup from "./Signup";


class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            username: ''
        };
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ? (
                    <PersonalGamePage token={this.state.token}
                                      username={this.state.username}

                    />
                ) : (
                    <div>
                    <UserForm onLogin={token => {

                        fetch('http://localhost:3001/api/getGames', {
                            headers: {
                                'Bearer': localStorage.token
                            },
                        })
                            .then(games => this.setState({loggedIn: true, token: token}))
                            .then(username => this.setState({username: username}))
                            .catch(err => console.error(err));
                    }}
                    />
                    <Signup />
                    </div>
                )}

            </div>
        );
    }
}

export default App;

