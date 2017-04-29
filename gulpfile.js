// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
 // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
		"scripts/vendor/jquery.min.js",
		"scripts/vendor/angular.min.js",
		"scripts/vendor/angular-route.min.js",
		"scripts/vendor/angular-translate.min.js",
		"scripts/vendor/angular-translate-loader-static-files.min.js",
		"scripts/vendor/angular-animate.min.js",
		"scripts/vendor/angular-touch.min.js",
		"scripts/vendor/ui-bootstrap-tpls-2.5.0.min.js",
		"scripts/vendor/bootstrap.min.js",
		"scripts/vendor/instafeed.min.js" ,
		"scripts/vendor/touch.js" ,
		"scripts/vendor/swipe.js" ,
		"scripts/vendor/angular-youtube-embed.min.js" ,
		"scripts/app.js",
		"scripts/services.js",
		"scripts/filters.js",
		"scripts/controllers.js",
		"scripts/directives.js"
	])
		.pipe(concat('bundle.js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('build'));
});
 // Default Task
gulp.task('default', ['scripts']);