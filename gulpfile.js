/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 03/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
var fs = require('fs');
var gulp = require('gulp');
// Constants
var path = './gulp/';

try {
	var directories = fs.readdirSync(path);
	if (directories) {
		directories.forEach(function (file) {
			require(path + file);
		});
	}

	gulp.task('default', ['backend:nodemon']);
}
catch (e){
	console.error(e);
}