/**
 * "Prints" out the games and their props for display on game page
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 *
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */


import React from 'react';
import Game from './Game';

const GameList = (props) => (
    <div>
        {props.games.length === 0 ? (
            <p>There are no games in the list</p>
        ) : (
            <ul>
                {props.games.map(
                    game => (
                        <Game
                            key={game._id}
                            id={game._id}
                            username={game.username}
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
    </div>
);
export default GameList;