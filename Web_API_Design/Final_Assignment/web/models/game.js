const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Constructor for new games
const gameSchema = new Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    platform: {type: String, required: true},
    releaseDate: {type: Number, required: true},
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;