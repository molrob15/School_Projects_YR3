/**
 * Enables functionality for deleting a game from list display on game page
 *
 * @author Robert Mattias Molin
 * version: 2017.12.07
 *
 * Inspired by: Martin Lehmann, Live code lectures 3-7
 * https://github.com/theneva/pg6300-17
 */

import React from 'react';

const Game = ({ id, username, title, releaseDate, platform, onDelete }) => (
    <li>
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
        <button
            onClick={() => {
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
            Delete
        </button>
    </li>
);

export default Game;