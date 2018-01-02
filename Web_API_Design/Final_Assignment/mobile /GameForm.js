/**
 * Form for saving new games on personal game page
 *
 *@author Robert M Molin
 *
 * Version: 2017.12.07
 * Inspired by: Tutorial @https://gellerj496howto.wordpress.com/
 * & Martin Lehmann code from lectures.
 */
import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ScrollView, TouchableHighlight,

} from 'react-native'


const t = require('tcomb-form-native');

const Form = t.form.Form;

const Game = t.struct({
    username: t.String,
    title: t.String,
    releaseDate: t.String,
    platform: t.String
});


const options = {
    fields: {
        username: {
            autoCapitalize: 'none',
            autoCorrect: false
        },

        title: {
            autoCapitalize: 'none',
            autoCorrect: false
        },
        releaseDate: {
            autoCapitalize: 'none',
            autoCorrect: false
        },
        platform: {
            autoCapitalize: 'none',
            autoCorrect: false
        }
    }
};


class GameForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {
                games: [],
                username: '',
                title: '',
                releaseDate: '',
                platform: ''
            }
        }
    }

    _onChange = (value) => {
        this.setState({
            value
        })
    };

    _saveGame = () => {
        const value = this.refs.form.getValue();

        if (value) {
            const data = {
                username: value.username,
                title: value.title,
                releaseDate: value.releaseDate,
                platform: value.platform,
            };

            const json = JSON.stringify(data);

            fetch('http://localhost:3001/api/saveGame', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json
            })
                .then(res => res.json())
                .then(savedGame => {
                    alert('Game saved', savedGame);
                    this.props.onCreated(savedGame);
                })
                .catch((error) => {
                    alert('An error occurred when saving game');
                })
        }
        else {
            alert('Please fix the form errors listed and try again.')
        }
    };


    _getGames = () => {
        fetch('http://localhost:3001/api/getGames', {
            headers: {
                'Bearer': AsyncStorage.token
            },
        })
            .then(games => this.setState({games}))
            .catch(err => alert("Didn't connect to the API", err));
    };


    render() {
        return (
            <ScrollView style={styles.container}>
                <Form
                    ref='form'
                    type={Game}
                    options={options}
                    value={this.state.value}
                    onChange={this._onChange}
                />

                <TouchableHighlight onPress={this._saveGame}>
                    <Text style={[styles.button, styles.greenButton]}>Save Game</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._getGames}>
                    <Text style={[styles.button, styles.blueButton]}>Get Games</Text>
                </TouchableHighlight>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
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
        backgroundColor: '#34AADC',
    },
    centering: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});



export default GameForm;

