/**
 * Login page for existing users
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 *
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */


import React, { Component } from 'react';

class LoginForm extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
        };
    }


    render() {
        return (
            <div className="container">
                <form onSubmit={e => {
                        e.preventDefault();
                    console.log('state', JSON.stringify(this.state));
                    console.log('submitted');
                }}>
                    <div className="App-header">
                        <h1>Epic Retro Game Page</h1>
                    </div>

                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="username-input">Username</label>
                        <input
                            className="form-control"
                            id="username-input"
                            type="text"
                            placeholder="username"
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-input">Password</label>
                        <input
                            className="form-control"
                            id="password-input"
                            type="password" pattern=".{4,}" required title="4 characters minimum"
                            placeholder="********"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-block"
                        onClick={ () => {

                            const body = {
                                username: this.state.username,
                                password: this.state.password
                            };



                            fetch('http://localhost:3001/api/login', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            })
                                .then(res => res.text())
                                .then(token => {
                                    localStorage.token = token;
                                    return token;
                                })
                                .then((token) => this.props.onLogin(token))
                                .then((username) => this.props.onLogin(username))
                                .catch(err => console.error(err));
                        }}>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}
export default LoginForm;






