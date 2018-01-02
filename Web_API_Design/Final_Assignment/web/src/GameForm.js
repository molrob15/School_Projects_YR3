/**
 * Form where existing users can save their games
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 *
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */

import React, {Component} from 'react';


class GameForm extends Component {



    constructor() {
        super();

        this.state = {
            games: [],
            username: '',
            title: '',
            releaseDate: '',
            platform: '',
        }
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
                        <h1>Epic Retro Games</h1>

                        <div>
                        <button
                            className= "btn-logout"
                            type="submit"
                            value="Logout"
                            onClick={() => {
                                  this.props.onLogout();
                                  localStorage.removeItem('token');
                                  console.log('Signing out');


                            }}>Sign out
                        </button>
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="game-title">
                            User
                        </label>
                        <input
                            id="user"
                            type="text"
                            ref="user"
                            className="form-control"
                            placeholder="User"
                            onChange={e => {
                                this.setState({username: e.target.value,});
                            }}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="game-title">
                            GameTitle
                        </label>
                        <input
                            id="gameTitle"
                            type="text"
                            ref="title"
                            className="form-control"
                            placeholder="Game Title"
                            onChange={e => {
                                this.setState({title: e.target.value,});
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="releaseDate">Released
                        </label>
                        <input
                            className="form-control"
                            id="releaseDate"
                            type="number"
                            ref="date"
                            placeholder="Release Date"
                            onChange={e => {
                                this.setState({releaseDate: e.target.value,});
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="platform">
                            Gaming Platform
                        </label>
                        <input
                            className="form-control"
                            id="platform"
                            type="text"
                            ref="game-platform"
                            placeholder="Platform"
                            onChange={e => {
                                this.setState({platform: e.target.value,});
                            }}
                        />
                    </div>

                    {/*Submit buttons*/}
                    <div className="button-group">
                    <span>

                     {/*Save button*/}
                        <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            value="Save Game"
                            ref="btn-save"
                            onClick={() => {

                                const body = {
                                    username: this.state.username,
                                    title: this.state.title,
                                    releaseDate: this.state.releaseDate,
                                    platform: this.state.platform
                                };

                                fetch('http://localhost:3001/api/saveGame', {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(body),
                                })
                                    .then(res => res.json())
                                    .then(savedGame => {
                                        console.log('Game saved', savedGame);
                                        this.props.onCreated(savedGame);
                                    })
                                    .catch(err => console.error(err));
                            }}>Save Game

                    </button>

                        <button
                            className="btn-get-games"
                            type="submit"
                            value="Get All Games"
                            onClick={() => {

                                fetch('http://localhost:3001/api/getGames', {
                                    headers: {
                                        'Bearer': localStorage.token
                                    },
                                })
                                    .then(games => this.setState({games}))
                                    .catch(err => console.log("Didn't connect to the API", err));

                            }}>Get Games!
                     </button>


                    </span>
                    </div>

                </form>

            </div>


        );
    }
}

export default GameForm;

