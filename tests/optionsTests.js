/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/11/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { assert } = require('chai');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const library = require('../index');

/* ************************************* */
/* ********        TESTS        ******** */
/* ************************************* */

describe('Options Tests', () => {
    describe('wantResponse options', () => {
        const expressApp = express();

        beforeEach(() => {
            expressApp.use(bodyParser.json());
            const headersSchema = {
                headers: {
                    test: Joi.string().min(5).required(),
                },
            };
            expressApp.get('/headers', library(headersSchema, {
                joiOptions: {
                    allowUnknown: true,
                },
                wantResponse: true,
            }), (req, res) => res.send('Ok'));
            const paramsSchema = {
                params: {
                    id: Joi.string().min(5).required(),
                },
            };
            expressApp.get('/params/:id', library(paramsSchema, {
                wantResponse: true,
            }), (req, res) => res.send('Ok'));
            const querySchema = {
                query: {
                    limit: Joi.number().greater(5).required(),
                },
            };
            expressApp.get('/query', library(querySchema, {
                wantResponse: true,
            }), (req, res) => res.send('Ok'));
            const bodySchema = {
                body: {
                    id: Joi.string().min(5).required(),
                },
            };
            expressApp.post('/body', library(bodySchema, {
                wantResponse: true,
            }), (req, res) => res.send('Ok'));
        });

        describe('headers', () => {
            it('should return a 400 with no header', (done) => {
                supertest(expressApp)
                    .get('/headers')
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 400 with header but not valid', (done) => {
                supertest(expressApp)
                    .get('/headers')
                    .set('test', 'a')
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 200 with header', (done) => {
                supertest(expressApp)
                    .get('/headers')
                    .set('test', 'aaaaaa')
                    .expect(200)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.text;
                        assert.isNotArray(resultBody);
                        assert.equal('Ok', resultBody);
                        done();
                    });
            });
        });

        describe('params', () => {
            it('should return a 404 with no params', (done) => {
                supertest(expressApp)
                    .get('/params')
                    .expect(404, done);
            });

            it('should return a 400 with params but not valid', (done) => {
                supertest(expressApp)
                    .get('/params/a')
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 200 with params', (done) => {
                supertest(expressApp)
                    .get('/params/aaaaaa')
                    .expect(200)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.text;
                        assert.isNotArray(resultBody);
                        assert.equal('Ok', resultBody);
                        done();
                    });
            });
        });

        describe('query', () => {
            it('should return a 400 with no query', (done) => {
                supertest(expressApp)
                    .get('/query')
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 400 with query but not valid', (done) => {
                supertest(expressApp)
                    .get('/query')
                    .query({
                        limit: 1,
                    })
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 200 with query', (done) => {
                supertest(expressApp)
                    .get('/query')
                    .query({
                        limit: 6,
                    })
                    .expect(200)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.text;
                        assert.isNotArray(resultBody);
                        assert.equal('Ok', resultBody);
                        done();
                    });
            });
        });

        describe('body', () => {
            it('should return a 400 with no body', (done) => {
                supertest(expressApp)
                    .post('/body')
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 400 with body but not valid', (done) => {
                supertest(expressApp)
                    .post('/body')
                    .send({
                        id: 'a',
                    })
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.body;
                        assert.isArray(resultBody);
                        assert.lengthOf(resultBody, 1);
                        done();
                    });
            });

            it('should return a 200 with body', (done) => {
                supertest(expressApp)
                    .post('/body')
                    .send({
                        id: 'aaaaaa',
                    })
                    .expect(200)
                    .end((err, result) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        const resultBody = result.text;
                        assert.isNotArray(resultBody);
                        assert.equal('Ok', resultBody);
                        done();
                    });
            });
        });
    });
});
