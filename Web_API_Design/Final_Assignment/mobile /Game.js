/**
 * Gets the games from Db retrogamesDb
 *
 *@author Robert M Molin
 *
 * Version: 2017.12.07
 */

import React from 'react';
import {ScrollView, StyleSheet, Button} from "react-native";

const Game = ({id, username, title, releaseDate, platform, onDelete}) => (
    <ScrollView style={styles.container}>
        {id}
        -
        {username}
        -
        {title}
        -
        {releaseDate}
        -
        {platform}
        -
        <Button
            title="Delete"
            onPress={() => {
                fetch(`http://localhost:3001/api/deleteGame/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log('The game has been deleted');
                        onDelete(id);
                    })
                    .catch(err => console.error(err));
            }}>
        </Button>

    </ScrollView>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,

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


export default Game;