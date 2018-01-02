/**
 * HomeScreen for mobile App
 *
 *@author Robert M Molin
 *
 * Version: 2017.12.07
 * Inspired by: Tutorial @https://gellerj496howto.wordpress.com/
 * 
 */



import React, { Component } from 'react';
import {
    NavigatorIOS,
    StyleSheet,
    TouchableHighlight,
    Text,
    View,
} from 'react-native'


const LoginScreen = require('./views/LoginScreen');
const SignupScreen = require('./views/SignupScreen');
const GameScreen = require('./views/GameScreen');



export default class Navigator extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styleNavigator.container}
                initialRoute={{
                    title: 'Retro Game Page',
                    component: App,
                }}/>
        )

    }

}

const styleNavigator = StyleSheet.create({container: {flex: 1} });




class App extends Component {


    constructor(props) {
        super(props);
    }



    _handleSignupScreen = () => {
        this.props.navigator.push({
            component: SignupScreen,
            title: 'Sign up for your own retro game page!',
            backButtonTitle: 'Back'
        })
    };

    _handleLoginScreen = () => {
        this.props.navigator.push({
            component: LoginScreen,
            title: 'Login',
            backButtonTitle: 'Back'
        })
    };
    _handleGameScreen = () => {
        this.props.navigator.push({
            component: GameScreen,
            title: 'Personal Game Page',
            backButtonTitle: 'Back'
        })
    };

    render() {
        return (

            <View style={styles.container}>

              <TouchableHighlight onPress={this._handleSignupScreen}>
                <Text style={[styles.button, styles.blueButton]}>
                  Register new user
                </Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={this._handleLoginScreen}>
                <Text style={[styles.button, styles.greenButton]}>
                  Log in with existing user
                </Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={this._handleGameScreen}>
                <Text style={[styles.button, styles.redButton]}>
                  Personal GamePage
                </Text>
              </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 80,
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
    redButton: {
        backgroundColor: '#FF3B30',
        color: '#fff'
    }
});
module.exports = Navigator;