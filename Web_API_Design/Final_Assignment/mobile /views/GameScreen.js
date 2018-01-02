/**
 * Screen for displaying personal game page
 * --> Unfortunately not yet correctly implemented
 *
 *
 *@author Robert M Molin
 *
 * Version: 2017.12.07
 * Inspired by: Tutorial @https://gellerj496howto.wordpress.com/
 * & Martin Lehmann code from lectures.
 */
import React, { Component } from 'react';

import {
    ActivityIndicatorIOS,
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'

import GameList from '../GameList';
import GameForm from '../GameForm';

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndicator: false,
            secret: null,
            games: []
        }
    }

    componentWillMount() {
        this.setState({
            showIndicator: true
        }, this._getGames)
    }

    _getGames = () => {
        AsyncStorage.getItem('token', (err, token) => {
            fetch('http://localhost:3001/api/getGames', {
                headers: {
                    'Bearer': AsyncStorage.token
                }
            })
                .then(res => res.json())
                .then(games => this.setState({games}))
                .catch(() => {
                    alert( 'An error occurred when getting games')
                })
                .done()
        })
    };

    _renderIndicator = () => (
        <ActivityIndicatorIOS
            animating
            style={[styles.centering]}
            size='large'
        />
    );



    _handleLogOut = () => {
        AsyncStorage.removeItem('token');
        alert('You have been logged out');
    };


    render() {
        return (
            <View style={styles.container}>


                <GameForm
                    token={this.props.token}
                    onCreated={createdGame => this.setState({
                        games: [
                            ...this.state.games,
                            createdGame,
                        ],
                    })}
                />
                <GameList
                    games={this.state.games}
                    onDelete={idToDelete => {
                        this.setState({
                            games: this.state.games.filter(game => game._id !== idToDelete),
                        });
                    }}
                />

                <TouchableHighlight onPress={this._handleLogOut}>
                    <Text style={[styles.button, styles.greyButton]}>
                        Log Out
                    </Text>
                </TouchableHighlight>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column'
    },
    button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    greenButton: {
        backgroundColor: '#4CD964'
    },
    blueButton: {
        backgroundColor: '#34AADC'
    },
    greyButton: {
            backgroundColor: '#777',
            color: '#fff'
    },
    centering: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = GameScreen;






