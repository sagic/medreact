var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

    var props = {
        entries: ['./scripts/client/main.js'],
        debug: true,
        transform: [babelify, reactify]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulp.dest('./build/'));
    }

    // listen for an update and run rebundle
    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

gulp.task('sass', function () {
    return gulp
        .src('./assets/styles/importer.scss')
        .pipe(sass({style: 'expanded', includePaths: ['./assets/styles/**/*'], errLogToConsole: true}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/client/assets/styles'));
});

gulp.task('images', function () {
    return gulp
        .src('./assets/images/**/*')
        .pipe(gulp.dest('./build/client/assets/images'));
});

gulp.task('bootstrap', function () {
    return gulp
        .src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./build/client/vendor/bootstrap'));
});

gulp.task('jquery', function () {
    return gulp
        .src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./build/client/vendor/jquery'));
});

gulp.task('build', ['bootstrap', 'sass', 'images', 'jquery'], function () {
    return buildScript('client/main.js', false);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['build'], function () {
    gulp.watch('./assets/styles/**/*.scss', ['sass']);
    return buildScript('client/main.js', true);
});