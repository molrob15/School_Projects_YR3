/**
 * Login for existing users
 *
 *@author Robert M Molin
 *
 * Version: 2017.12.07
 * Inspired by: Tutorial @https://gellerj496howto.wordpress.com/
 * & Martin Lehmann code from lectures.
 */
import React, { Component } from 'react';
import {
    AsyncStorage,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native'

const t = require('tcomb-form-native');

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password:  t.String
});

const options = {
    fields: {
        username: {
            autoCapitalize: 'none',
            autoCorrect: false
        },
        password: {
            autoCapitalize: 'none',
            password: true,
            autoCorrect: false
        }
    }
};

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                username: '',
                password: ''
            }
        }
    }

    componentWillUnmount() {
        this.setState = {
            value: {
                username: '',
                password: null
            }
        }
    }

    _onChange = (value) => {
        this.setState({
            value
        })
    };

    _handleAdd = () => {
        const value = this.refs.form.getValue();

        if (value) {
            const data = {
                username: value.username,
                password: value.password
            };

            const json = JSON.stringify(data);
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then((res) => res.text())
                .then((token) => {
                    if (token.error) {
                        alert(token.error)
                    } else {
                        AsyncStorage.token = token;
                        alert(`Success! You can now access your personal game page.`);
                        this.props.navigator.pop()
                    }
                })
                .catch(() => {
                    alert('There was an error logging in.');
                })
                .done()
        } else {
            alert(' Please try again.')
        }
    };




    render() {
        return (
            <ScrollView style={styles.container}>
                <Form
                    ref='form'
                    options={options}
                    type={User}
                    value={this.state.value}
                    onChange={this._onChange}
                />
                <TouchableHighlight onPress={this._handleAdd}>
                    <Text style={[styles.button, styles.greenButton]}>Log In</Text>
                </TouchableHighlight>
            </ScrollView>
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
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = LoginScreen;