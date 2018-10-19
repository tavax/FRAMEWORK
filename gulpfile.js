
// Requis
var gulp = require('gulp'),
	cssbeautify = require('gulp-cssbeautify'),
	inlineCss = require('gulp-inline-css');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
const autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var extender = require('gulp-html-extend');
var del = require('del');

// Include plugins
var plugins = require('gulp-load-plugins')();

// Variables de chemins
var source = './app'; // dossier de travail
var destination = './dist'; // dossier à livrer


// les tâches
gulp.task('sass', function(){
  return gulp.src(source + '/scss/**/*.scss')
  	.pipe(plugins.sass())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(inlineCss({
            	applyStyleTags: true,
            	applyLinkTags: true,
            	removeStyleTags: true,
            	removeLinkTags: true
        }))
    .pipe(gulp.dest(destination + '/css'))
});

/*gulp.task('minify', function () {
  return gulp.src(destination + '/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/css/'));
});*/

// fusion des includes en un seul fichier
gulp.task('html', function() {
  return  gulp.src(source + '/{,blocks/}*.html')
    // Generates HTML includes
    .pipe(extender({
      annotations: true,
      verbose: true
    }))
    .pipe(gulp.dest(destination))
});

/*gulp.task('watch', function () {
    gulp.watch([destination + '/*.html'], ['html'])
})
*/

// suppression du dossier distribution (dist)
gulp.task('clean', function() {
  del(destination);
})