var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');


gulp.task('sass', function () {
    // This task can watch & solo run
    gulp.src('./sass/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('modularity.css'))
        .pipe(gulp.dest('./build'));
});