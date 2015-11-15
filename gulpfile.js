var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ESdoc = require("gulp-esdoc"),

    // JSdoc have a bug : https://github.com/jsBoot/gulp-jsdoc/issues/18
    // JSdoc = require("gulp-jsdoc"),

    sass = require('gulp-sass');



// This task can watch & solo run
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('modularity.css'))
        .pipe(gulp.dest('./build'));
});


// Generate two documentations in differents folder.
gulp.task('generate documentation', function () {

/*
    // JSDoc
    gulp.src("./build/modularity.js")
        .pipe(JSdoc('./build/docs/jsdoc'));
*/

    // ESDoc
    gulp.src("./src")
        .pipe(ESdoc({
            destination: "./build/docs/esdoc",
            includeSource: true
        }));
});
