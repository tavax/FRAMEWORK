
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
var gulpRemoveHtml = require('gulp-remove-html');
var runSequence = require('run-sequence');

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
    .pipe(gulp.dest(source + '/css'))
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

gulp.task('remove-html', function () {
  return gulp.src(source + '/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest(destination + '/index.txt'));
});


gulp.task('final', function (callback) {
  runSequence('inliner', 'html',
  callback
  )
})

/*gulp.task('watch', function () {
    gulp.watch([destination + '/*.html'], ['html'])
})
*/

gulp.task('inliner', function() {
    return gulp.src(source + '/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest(source));
});

// suppression du dossier distribution (dist)
gulp.task('clean', function() {
  del(destination);
})