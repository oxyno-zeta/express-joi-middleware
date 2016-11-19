/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 03/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */


/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

module.exports = {
    tests: {
        resultDir: 'coverage/',
        backend: {
            toTest: [
                'index.js',
            ],
            files: [
                'tests/**/*.js',
            ],
            options: {
                reporter: 'spec',
                report: 'lcovonly',
                timeout: 10000,
                color: true,
                bail: false, // True : stop after first fail
            },
        },
    },
};
