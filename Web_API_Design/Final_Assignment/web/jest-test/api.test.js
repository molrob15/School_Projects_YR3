/**
 * Incomplete test class for testing api functionality
 *
 *
 *
 */


const express = require('express');
const request = require('supertest');
const app = express();
const api = require('../routes/api');

// make api available
app.use(api);


describe('/saveGame', () => {
    it('should get a game', () => {
        // send a request
        return request(app)
            .get('/getGames')

            // verify response
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(res => {
                const game = res.body;
                expect(game.username).toEqual(String);
                expect(game.title).toEqual(String);
                expect(game.platform).toEqual(String);
                expect(game.releaseDate).toEqual(Number);
            })
    })
});



describe('/saveGame', () => {
    it('should save a game', () => {
        // send a request
        return request(app)
            .post('/addGame')

            // verify response
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(res => {
                const game = res.body;
                expect(game.username).toEqual(String);
                expect(game.title).toEqual(String);
                expect(game.platform).toEqual(String);
                expect(game.releaseDate).toEqual(Number);
            })
    })
});




describe('/getGames', () => {
    it('respond with json', (done) => {
        request(app)
            .get('/getGames')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


