/**
 * Displays the games form retrogamesDb
 *
 * Does not currently work properly, components need to be
 * replaced to proper React Native Components, could't get this working unfortunately.
 *
 *@author Robert M Molin
 *
 * Version: 2017.12.07
 */
import React from 'react';
import Game from './Game';
import {Text, View} from "react-native";

const GameList = (props) => (
    <View>
        {props.games.length === 0 ? (
            <Text>There are no games in the list</Text>
        ) : (
            <ul>
                {props.games.map(
                    game => (
                        <Game
                            key={game._id}
                            id={game._id}
                            title={game.title}
                            releaseDate={game.releaseDate}
                            platform={game.platform}
                            onDelete={idToDelete => {
                                props.onDelete(idToDelete);
                            }}
                        />
                    )
                )}
            </ul>
        )}
    </View>
);
export default GameList;