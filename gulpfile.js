// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var moreCSS = require("gulp-more-css");
var cssnano = require("gulp-cssnano");
var jade = require("gulp-jade");
var pug = require('gulp-pug');
var watch = require('gulp-watch');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
// const image = require('gulp-image');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Lint Task
gulp.task("lint", function() {
  return gulp.src("public/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task('imagemin', () =>
    gulp.src('public/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/build/img'))
);

// Concatenate & Minify JS
gulp.task("scripts", function() {
  return gulp.src("public/js/*.js")
    .pipe(rename("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("script"));
});
 
gulp.task('pug',function() {
 return gulp.src('public/template/*.jade')
 .pipe(pug({
    doctype: 'html',
    pretty: false
 }))
 .pipe(gulp.dest('public'));
});

// Watch Files For Changes
// gulp.task("watch", function() {
//   gulp.watch("src/js/*.js", ["lint", "scripts"]);
//   gulp.watch("src/scss/*.scss", ["sass"]);
//   gulp.watch("src/*.jade", ["jade"]);
// });

gulp.task('watch', function () {
 return watch('public/template/*.jade', { ignoreInitial: false })
    .pipe(gulp.dest('public/pug'));
 });

// Get one .styl file and render
gulp.task('one', function () {
  return gulp.src('public/css/default.styl')
    .pipe(stylus())
    .pipe(gulp.dest('public/css'));
});
 
// Include css
// Stylus has an awkward and perplexing 'include css' option
gulp.task('include-css', function() {
  return gulp.src('public/styl/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('public/css'));
 
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('public/template/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('public'))
});

gulp.task('mincss', function () {
    gulp.src('public/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/build'));
});

gulp.task('prefix', () =>
    gulp.src('css/default.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'))
);

// gulp.task('image', function () {
//   gulp.src('public/img/*')
//     .pipe(image())
//     .pipe(gulp.dest('public/build'));
// });

// gulp.task('gulp-data', function() {
//   gulp.src('./components/**/*.styl')
//     .pipe(data(function(file){
//       return {
//         componentPath: '/' + (file.path.replace(file.base, '').replace(/\/[^\/]*$/, ''))
//       };
//     }))
//     .pipe(stylus())
//     .pipe(gulp.dest('./css/build'));
// });

// Default Task
gulp.task("default", ["lint", "jade", "pug", "one", "include-css", "mincss", "prefix", "watch"]);