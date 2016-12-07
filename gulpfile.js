// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply');

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    del = require('del'),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML = require('gulp-minify-html'),
    rjs = require('gulp-requirejs-bundler');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('Scripts/require.config.js') + '; require;'),
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './',
        name: 'Scripts/startup',
        paths: {
            requireLib: 'node_modules/requirejs/require'
        },
        include: [
            'requireLib',

            // need include or it will lost when require
            'signalr.core',
            'jquery.localize'
        ],
        insertRequire: ['Scripts/startup'],
        bundles: {
            'user-info': ['Scripts/App/userInfo'],
            'user-list': ['Scripts/App/userList'],
            'stock-ticker': ['Scripts/App/signalR.StockTicker']
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('uglifyrjs', function() {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./build/'));
});


gulp.task('minify-css', function() {
    return gulp.src('./CSS/*.css')
        .pipe(concat('all.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('html', function() {
    return gulp.src('./Index.html')
        .pipe(htmlreplace({
            'css': 'all.min.css',
            'js': 'scripts.js'
        }))
        .pipe(minifyHTML({ empty: true, quotes: true }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['minify-css', 'uglifyrjs', 'html']);