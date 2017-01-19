Express Joi Middleware
======================

[![Build Status](https://travis-ci.org/oxyno-zeta/express-joi-middleware.svg?branch=master)](https://travis-ci.org/oxyno-zeta/express-joi-middleware)
[![Build Status](https://circleci.com/gh/oxyno-zeta/express-joi-middleware.png)](https://circleci.com/gh/oxyno-zeta/express-joi-middleware)
[![npm](https://img.shields.io/npm/v/express-joi-middleware.svg)]()
[![Dependency Status](https://gemnasium.com/badges/github.com/oxyno-zeta/express-joi-middleware.svg)](https://gemnasium.com/github.com/oxyno-zeta/express-joi-middleware)
[![Coverage Status](https://coveralls.io/repos/github/oxyno-zeta/express-joi-middleware/badge.svg?branch=master)](https://coveralls.io/github/oxyno-zeta/express-joi-middleware?branch=master)

## Description
Implementation of [Joi](https://github.com/hapijs/joi) middleware for ExpressJS.

## Features
- Joi validator middleware for ExpressJS
- Fully customizable
- Possible to pass your 'Joi' module

## How to use
### Install
```bash
npm install --save express-joi-middleware
```
### Example Usage
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const expressJoiMiddleware = require('express-joi-middleware');

const app = express();

app.use(bodyParser.json());
const bodySchema = {
    body: {
        id: Joi.string().min(5).required(),
    },
};
const options = {
    wantResponse: true,
};
app.post('/body', expressJoiMiddleware(bodySchema, options), (req, res) => res.json(req.validated));

app.listen(8080);
```

## API
### Schema
A javascript object with these possible keys :
- body
- query
- params
- headers

In these keys, you must provide an object with a 'Joi' validation.

### Options
A javascript object with these possible keys :
- joi
- joiOptions
- validationCallback
- wantResponse
- overrideBody

#### joi
This key is a possibility to pass a Joi instance if you want to pass an old (or new) Joi module version.
Default value : Library version.

#### joiOptions
This key is for all [Joi options in validate](https://github.com/hapijs/joi/blob/master/API.md#validatevalue-schema-options-callback).
Default value : {}.

#### wantResponse
This option is here if you want that the library send the response with a 400 as status code and the [Joi Error](https://github.com/hapijs/joi/blob/master/API.md#errors) details part as body.
Otherwise, the library will 'next' the [Joi Error](https://github.com/hapijs/joi/blob/master/API.md#errors).
You can catch them like that : 
```javascript
app.use((err, req, res, next) => {
    if (err.isJoi) {
        res.status(400).json(err.details);
        return;
    }
    
    res.status(500).send('Internal Server Error');
});
```
Default value : false (the library will 'next' error).

#### overrideBody
This option is here to override 'body' in request instead of creating a new key : 'validated'.
Default value : false (the library will create a 'validated' key in request).

#### validationCallback
This option is here to provide a way to change the 'validation' callback.
This option must be a function (a) that return another function (b).
The first function (a) will have these parameters : 
- req (request)
- res (response)
- next (next function)
- options (options of the middleware)

The second function (b) will have these parameters :


## Thanks
* My wife BH to support me doing this

## Author
* Oxyno-zeta (Havrileck Alexandre)

## License
MIT (See in License.md)
