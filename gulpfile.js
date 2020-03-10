const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

//Compile the SCSS to CSS
function style() {
    return gulp.src('scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

//Create a local server to be able to see the changes when we save the files
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/app.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;