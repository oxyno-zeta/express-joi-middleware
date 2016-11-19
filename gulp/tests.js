/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 24/09/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const gulpMocha = require('gulp-mocha');
const gulpIstanbul = require('gulp-istanbul');
const runSequence = require('run-sequence');

const conf = require('./conf');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('tests', (cb) => {
    runSequence('clean:tests', 'tests:backend', cb);
});

gulp.task('tests:backend', (cb) => {
    gulp.src(conf.tests.backend.toTest)
        .pipe(gulpIstanbul()) // Covering files
        .pipe(gulpIstanbul.hookRequire()) // Force `require` to return covered files
        .once('finish', () => {
            gulp.src(conf.tests.backend.files)
                .pipe(gulpMocha(conf.tests.backend.options))
                .once('error', (err) => {
                    // Check if test failed of something else
                    if (err.message.indexOf('test failed') !== -1) {
                        // Test fail
                        return;
                    }

                    // Print error
                    console.error(err);
                    // Continue even if there is an error
                    this.emit('end');
                })
                .pipe(gulpIstanbul.writeReports({
                    dir: conf.tests.resultDir,
                    reporters: ['lcov', 'cobertura', 'clover', 'json', 'text', 'text-summary'],
                    reportOpts: {
                        dir: conf.tests.resultDir,
                    },
                })) // Creating the reports after tests ran
                .once('end', cb);
        });
});
