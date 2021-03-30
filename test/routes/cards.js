const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Routes: cards', () => {
    before(() => {
        return app.init()
            .then((out) => {
              console.log(out)  
            });
    });
    describe('#GET /cards', () => {
        it('should hard redirect to a random card', () => {
            console.log('test running');
            return request(app).get('/cards')
                .then((res) => {
                    assert.equal(res.status, 302);
                    assert.match(res.header.location, /\/cards\/\d/);
                });
        });
    });
    describe('#GET /cards/:id', () => {
        describe('?side=question', () => {
            it('should display an html template with link to side=answer', () => {
                return request(app).get('/cards/1?side=question')
                    .then((res) => {
                        assert.match(res.text, /<a href="1\?side=answer">/)
                    });
            });
        });
        describe('?side=answer', () => {
            it('should display an html template with link to side=question', () => {
                return request(app).get('/cards/1?side=answer')
                    .then((res) => {
                        assert.match(res.text, /<a href="1\?side=question">/)
                        assert.match(res.text, /<h1/)
                    });
            });
        });
    });

});