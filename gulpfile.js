'use strict';
var zip = require('gulp-zip');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

// Default is development
global.isProd = false;

gulp.task('build', function() {
  global.isProd = true;
  runSequence('js');
});

gulp.task('js', function() {
  var compiler = browserify({
    entries: './src/index.js',
    debug: !global.isProd,
  }).transform('babelify', { presets: ['es2015'] });

  return compiler.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(!global.isProd, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(global.isProd, uglify().on('error', gutil.log)))
    .pipe(gulpif(!global.isProd, sourcemaps.write('./')))
    .on('error', gutil.log)
    .pipe(gulp.dest('app/dist'));
});

gulp.task('zip', function() {
  return gulp.src('app/**')
    .pipe(zip('release.zip'))
    .pipe(gulp.dest('.'));
});
