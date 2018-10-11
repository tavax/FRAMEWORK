'use strict';

// Requis
var gulp = require('gulp');
var sass = require('gulp-sass');
var extender = require('gulp-html-extend')

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './app'; // dossier de travail
var destination = './dist'; // dossier à livrer


gulp.task('sass', function(){
  return gulp.src(source + '/scss/**/*.scss')
  	.pipe(plugins.sass())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest(destination + '/css'))
});

gulp.task('extend', function () {
    gulp.src(source + '/*.html')
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(destination))
 
})
gulp.task('watch', function () {
    gulp.watch([source + '/*.html'], ['extend'])
})