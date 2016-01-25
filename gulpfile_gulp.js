'use strict';


var
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    ESdoc = require("gulp-esdoc"),
    eslint = require('gulp-eslint'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    reactify = require('reactify'),
    sourcemaps = require('gulp-sourcemaps'),
    tap = require('gulp-tap'),
    gutil = require('gulp-util'),
    KarmaServer = require('karma').Server,

    // JSdoc have a bug : https://github.com/jsBoot/gulp-jsdoc/issues/18
    // JSdoc = require("gulp-jsdoc"),

    path = require('path'),
    peg = require('gulp-peg'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream');


String.prototype.toUpperCaseFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};



gulp.task('watching', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./grammars/**/*.pegjs', ['build parser']);
    gulp.watch('./src/**/*.js', ['lint', 'babel']);
    gulp.watch('./tests/**/*.js', ['babel']);
    gulp.watch('./build/src/**/*.js', ['browserify']);
    gulp.watch('./build/modularity.js', ['run tests']);
});


gulp.task('transform ES6 to ES5', ['babel', 'browserify']);


gulp.task('lint', function () {
    return gulp.src([
        './src/**/*.js',
        '!./src/parser/*.js' // NOT the parser folder
        // , 'tests/**/*.js'
    ])
        .pipe(eslint({
            "extends": "eslint:recommended",
            "ecmaFeatures": {
                "jsx": true, // react
                "modules": true,
                "classes": true,
                "blockBindings": true, // let, const
                "experimentalObjectRestSpread": true // ...values
            },
            "globals": {
                // "jQuery": false,
                // "$": true
            },
            "env": {
                "es6": true,
                "node": true,
                "browser": true
            },
            "rules": {},
            "plugins": [
                "eslint-plugin-react"
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


// This task can watch & solo run
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('modularity.css'))
        .pipe(gulp.dest('./build'));
});


// Generate two documentations in different folder.
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
    return gulp.src('./grammars/**/*.pegjs')
        .pipe(peg().on("error", gutil.log))
        .pipe(rename(function (path) {
            path.basename += "_parser";
            path.extname = ".js"
        }))
        .pipe(gulp.dest('./src/parser'))

        // convert parser-file to a module
        .pipe(tap(
            function(file) {
                if (path.extname(file.path) === '.js') {
                    var item = path.parse(file.path),
                        fileName = item.dir + '/' + item.base,
                        keyName = item.name.replace('_p', 'P').toUpperCaseFirstLetter(); // author_parser -> AuthorParser

                    fs.readFile(fileName, 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }

                        fs.writeFile(
                            fileName,
                            data.replace('module.exports = (function() {', 'export var ' + keyName + ' = (function() {'),
                            'utf8',
                            function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            }
                        );
                    });
                }
            }
        ));
});


gulp.task('clean build', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean({force: true}));
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


gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './build/src/modularity.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [reactify]
    });

    return b.bundle()
        .pipe(source('modularity.js'))
        .pipe(gulp.dest('./build'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(rename('modularity.min.js'))
        .pipe(gulp.dest('./build'))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(rename('modularity.min.map'))
        .pipe(gulp.dest('./build'));
});
