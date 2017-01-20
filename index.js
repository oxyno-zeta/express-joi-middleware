/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/11/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */


/* ************************************* */
/* ********      CONSTANTS      ******** */
/* ************************************* */
const optionsDefault = {
    joi: null,
    joiOptions: {},
    validationCallback: null,
    wantResponse: false,
    overrideBody: false,
};

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = middleware;

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Default Validation Callback.
 * @param req {Object} request
 * @param res {Object} response
 * @param next {Function} next function
 * @param options {Object} middleware options
 * @returns {Function}
 */
function validationCallback(req, res, next, options) {
    return (err, value) => {
        // Check if error exists
        if (err) {
            // Get want response
            const wantResponse = options.wantResponse || false;
            if (wantResponse) {
                res.status(400).json(err.details);
            } else {
                next(err);
            }
            return;
        }

        // Get override body
        const overrideBody = options.overrideBody || false;
        // Add value to request
        const key = overrideBody ? 'body' : 'validated';
        const extendObject = {};
        extendObject[key] = value;
        Object.assign(req, extendObject);

        // Go to next
        next();
    };
}

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Middleware function.
 * @param schema {Object} Schema to validate
 * @param options {Object} Middleware function
 * @returns {Function}
 */
function middleware(schema, options = optionsDefault) {
    return (req, res, next) => {
        // Test if schema exists
        /* istanbul ignore if */
        if (!schema) {
            next();
        }

        // Test if Joi is provided
        const Joi = options.joi || require('joi');

        // Object to validate
        const objectToValidate = {};
        ['params', 'body', 'query', 'headers'].forEach((key) => {
            if (schema[key]) {
                objectToValidate[key] = req[key];
            }
        });

        // Get joi options
        const joiOptions = options.joiOptions || {};

        // Get callback
        const callback = options.validationCallback || validationCallback;

        return Joi.validate(objectToValidate, schema, joiOptions, callback(req, res, next, options));
    };
}
