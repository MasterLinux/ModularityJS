'use strict';


var
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    ESdoc = require("gulp-esdoc"),
    uglify = require('gulp-uglify'),
    reactify = require('reactify'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    KarmaServer = require('karma').Server,

    // JSdoc have a bug : https://github.com/jsBoot/gulp-jsdoc/issues/18
    // JSdoc = require("gulp-jsdoc"),

    pegjs = require('gulp-pegjs'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream');



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


gulp.task('transform ES6 to ES5', [
        '1. babel',
        '2. browserify',
        '3. minify'
    ]
);


gulp.task('clean build', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean({force: true}));
});


gulp.task('1. babel', function () {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            sourceMaps: false,
            comments: true,
            ast: false,
            presets: ["es2015", "react"]
        }))
        .pipe(gulp.dest('./build/src'));
});


gulp.task('2. browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './build/src/modularity.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [reactify]
    });

    return b.bundle()
        .pipe(source('modularity_source.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/src/'));
});


gulp.task('3. minify', function () {
    return gulp.src('./build/src/modularity_source.js')
        .pipe(uglify())
        .pipe(rename('modularity_source.min.js'))
        .pipe(gulp.dest('./build/src'));
});
