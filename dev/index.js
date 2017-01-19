/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 19/01/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const library = require('../index');

/* ************************************* */
/* ********         RUN         ******** */
/* ************************************* */

const app = express();
app.use(bodyParser.json());
const headersSchema = {
    headers: {
        test: Joi.string().min(5).required(),
    },
};
app.get('/headers', library(headersSchema, {
    wantResponse: true,
    joiOptions: {
        allowUnknown: true,
    },
}), (req, res, next) => {
    console.log(req.validated);
    next();
}, (req, res) => res.send('Ok'));
const paramsSchema = {
    params: {
        id: Joi.string().min(5).required(),
    },
};
app.get('/params/:id', library(paramsSchema), (req, res) => res.send('Ok'));
const querySchema = {
    query: {
        limit: Joi.number().greater(5).required(),
    },
};
app.get('/query', library(querySchema), (req, res) => res.send('Ok'));
const bodySchema = {
    body: {
        id: Joi.string().min(5).required(),
    },
};
app.post('/body', library(bodySchema), (req, res) => res.send('Ok'));

app.listen(3000, () => {
    console.log('listen');
});
