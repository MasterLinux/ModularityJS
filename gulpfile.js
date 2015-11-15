var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    ESdoc = require("gulp-esdoc"),
    KarmaServer = require('karma').Server,

    // JSdoc have a bug : https://github.com/jsBoot/gulp-jsdoc/issues/18
    // JSdoc = require("gulp-jsdoc"),

    pegjs = require('gulp-pegjs'),
    rename = require('gulp-rename'),
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



gulp.task('start watching JavaScript files and run tests', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        reporters: ["progress"],
        singleRun: false,
        autoWatch: true,
        colors: true
    }, done).start();
});


gulp.task('run tests', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        reporters: ["dots"],
        singleRun: true,
        autoWatch: false,
        colors: false
    }, done).start();
});


gulp.task('build parser', function() {
    return gulp.src('src/parser/*.pegjs')
        .pipe(pegjs())
        .pipe(rename(function (path) {
            path.basename += "_parser";
            path.extname = ".js"
        }))
        .pipe(gulp.dest('src/parser'));
});


gulp.task('babel', function () {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            sourceMaps: false,
            comments: true,
            ast: false,
            presets: ["es2015", "react"]
        }))
        .pipe(gulp.dest('./build/src'));
});

