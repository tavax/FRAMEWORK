
// Requis
var gulp = require('gulp'),
	cssbeautify = require('gulp-cssbeautify'),
	inlineCss = require('gulp-inline-css');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
const autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
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

// Tâche "html" = includes HTML
gulp.task('html', function() {
  return  gulp.src(source + '/{,blocks/footer/2018/}/{,blocks/content/2018/}/{,blocks/header/}*.html')
    // Generates HTML includes
    .pipe(extender({
      annotations: true,
      verbose: true
    })) // default options
    .pipe(gulp.dest(destination))
});

/*gulp.task('watch', function () {
    gulp.watch([destination + '/*.html'], ['html'])
})
*/