/**
 * Displays games on users game page
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 *
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */


import React, {Component} from 'react';
import './App.css';
import GameList from './GameList';
import GameForm from './GameForm';


class PersonalGamePage extends Component {
    constructor() {
        super();

        this.state = {
            games: [],
        };
    }

    componentWillMount() {

        return fetch('http://localhost:3001/api/getGames', {
            headers: {
                'Bearer': localStorage.token
            },
        })
            .then(res => res.json())
            .then(games => this.setState({games}))
            .catch(err => console.error(err));
    }


    render() {
        return (
            <div>
                <GameForm
                    onLogout={() => this.setState({loggedIn: false})}
                    username={this.state.username}
                    token={this.props.token}
                    onCreated={createdGame => this.setState({
                        games: [
                            ...this.state.games,
                            createdGame,
                        ],
                    })}/>
                <GameList
                    games={this.state.games}
                    onDelete={idToDelete => {
                        this.setState({
                            games: this.state.games.filter(game => game._id !== idToDelete),
                        });
                    }}
                />

            </div>

        );
    }
}

export default PersonalGamePage;

