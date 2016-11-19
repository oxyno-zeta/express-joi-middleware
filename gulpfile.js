/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 03/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const fs = require('fs');
const gulp = require('gulp');
// Constants
const path = './gulp/';

try {
    const directories = fs.readdirSync(path);
    if (directories) {
        directories.forEach((file) => {
            require(path + file);
        });
    }

    gulp.task('default', ['tests']);
} catch (e) {
    console.error(e);
}
