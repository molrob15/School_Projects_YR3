/**
 * Sign up page for new users
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 *
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */

 import React, {Component} from 'react';


class Signup extends Component {


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
                <form id="new-user-form"
                    onSubmit={e => {
                    e.preventDefault();

                    console.log('state', JSON.stringify(this.state));
                    console.log('submitted');
                }}>
                    <h1>Sign up new user</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            className="form-control"
                            id="username"
                            type="text"
                            placeholder="username"
                            onChange={e => this.setState({username: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter password</label>
                        <input
                            className="form-control"
                            id="newPassword"
                            type="password" pattern=".{4,}" required title="4 characters minimum"
                            placeholder="********"
                            onChange={e => this.setState({password: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-input">Confirm Password</label>
                        <input
                            className="form-control"
                            id="password-input"
                            type="password" pattern=".{4,}" required title="4 characters minimum"
                            placeholder="********"
                            onChange={e => this.setState({password: e.target.value})}
                        />
                    </div>

                    <button
                        className="btn btn-primary btn-block"
                        onClick={() => {

                            const body = {
                                username: this.state.username,
                                password: this.state.password
                            };

                            fetch('http://localhost:3001/api/addUser', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            })
                                .then(res => res.json())
                                .then(newUser => {
                                    console.log('new user saved!', newUser);
                                })
                                .catch(err => console.error(err));
                        }}>
                        Sign up!
                    </button>

                </form>

            </div>
        );

    }

}

export default Signup;