const jwtSimple = require('jwt-simple');
const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();

const Game = require('../models/game');
const User = require('../models/user');

const secret = 'abcde';


/*Code for user collection in Db*/

//Save new user to Db and check for possibility of already existing username
router.post('/addUser', (req, res) => {

    const user = req.body;

    if (!user.username) {
        res.status(400).send('Field must contain a valid username');
        return;
    }

    if (!user.password) {
        res.status(400).send('Field must contain password');
        return;
    }

    User.findOne({username: user.username}, (err, existingUser) => {

        if (existingUser) {
            res.status(409).send('User already exist in db');

        }
        else {
            const userWithHashedPassword = {
                username: user.username,
                password: bcrypt.hashSync(user.password, 10)
            };

            User.create(userWithHashedPassword, (err, newUser) => {

                if (err) {
                    res.status(500).send('Something went wrong');
                    console.error(err);
                    return;
                }
                res.status(201).send(newUser);
            })
        }

    });

});


//Login field for existing user
router.post('/login', (req, res) => {
    const user = req.body;

    if (!user.username) {
        res.status(400).send('Field must contain username');
        return;
    }
    if (!user.password) {
        res.status(400).send('Field must contain password');
        return;
    }

    User.findOne({username: user.username}, (err, existingUser) => {
        if (err) {
            res.status(500).send('Something went wrong');
            console.error(err);
            return;
        }

        if (existingUser === null) {
            res.status(401).send('No such user exist');
            return;
        }

        const passwordsMatch = bcrypt.compareSync(
            user.password,
            existingUser.password
        );

        if (!passwordsMatch) {
            res.status(401).send('Wrong password try again');
            return;
        }

        const payload = {
            username: user.username,
        };
        const token = jwtSimple.encode(payload, secret);

        res.status(200).send(token);
    });
});


router.get('/me', (req, res) => {

    const token = req.header('Bearer');

    if (!token) {
        res.status(401).send('Please include a token');
        return;
    }
    const payload = jwtSimple.decode(token, secret);
    const user = payload.username;

    User.findOne({username: user.username}, (err, user) => {
        if (err) {
            res.status(500).send('Something went wrong');
            console.error(err);
            return;
        }
        res.status(200).send(user);
    });

});

/*Api functions for the game collection in Db*/

//Save new game
router.post('/saveGame', (req, res, next) => {

    const body = req.body;
    const game = new Game(body);

    game.save((err, savedGame) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send(savedGame);
    })
        .catch(next);
});


//Get a user's games from Db
router.get('/getGames', (req, res, next) => {

    const token = req.header('Bearer');

    if (!token) {
        res.status(401).send('Please include a token');
        return;
    }

    const payload = jwtSimple.decode(token, secret);

    Game.find({username: payload.username}, (err, games) => {

        if (err) {
            res.status(500).send('Something went wrong');
            console.error(err);
            return;
        }
        res.status(200).send(games)


    }).catch(next);

});






//Update game
router.put('/updateGame/:id', (req, res, next) => {

    const id = req.params.id;

    const index = Game.findByIdAndUpdate({_id: req.params.id}, req.body);

    if (index === -1) {
        res.status(404).send('Game ' + id + ' does not exist');
        return;
    }
    Game.findOne({_id: req.params.id})
        .then((game) => {
            res.status(200).send(game);
        })
        .catch(next);
});


//Delete game
router.delete('/deleteGame/:id', (req, res, next) => {
    const id = req.params.id;

    const index = Game.findByIdAndRemove({_id: req.params.id}, req.body);

    if (index === -1) {
        res.status(404).send('Game ' + id + ' does not exist');
        return;
    }
    Game.findByIdAndRemove({_id: req.params.id})
        .then((game) => {
            res.status(200).send(game);
        })
        .catch(next);

});


module.exports = router;
