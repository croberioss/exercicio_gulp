const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/style/main.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('./build/style'));
}

exports.default = function() {
    gulp.watch('./source/style/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
}