// *************************************
//
//   Gulpfile
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------

// ----- Gulp ----- //

var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');

// ----- NPM ----- //
var run          = require('run-sequence');

// -------------------------------------
//   Variables
// -------------------------------------

var options = {
    build: {
        tasks: ['javascript', 'stylesheets']
    },

    js: {
        files: [
            'client/app.js',
            'client/**/*.js'
        ],
        vendorFiles: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        destFile: 'application.js',
        destVendorFile: 'vendor.js',
        destDir: 'public/js'
    },

    css: {
        files: [
            'client/css/*.css'
        ],
        vendorFiles: [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css'
        ],
        destFile: 'application.css',
        destVendorFile: 'vendor.css',
        destDir: 'public/css'
    }
};


// -------------------------------------
//   Task: build
// -------------------------------------

gulp.task('build', function() {
    run(options.build.tasks);
});

// -------------------------------------
//   Task: JavaScript
// -------------------------------------

gulp.task('javascript', function() {
    // application.js
    gulp.src(options.js.files)
        // .pipe(uglify({ mangle: false }))
        .pipe(concat(options.js.destFile))
        .pipe(gulp.dest(options.js.destDir));

    // vendor.js
    gulp.src(options.js.vendorFiles)
        // .pipe(uglify({ mangle: false }))
        .pipe(concat(options.js.destVendorFile))
        .pipe(gulp.dest(options.js.destDir));
});

// -------------------------------------
//   Task: JavaScript
// -------------------------------------

gulp.task('stylesheets', function() {
    // application.css
    gulp.src(options.css.files)
        // .pipe(uglify({ mangle: false }))
        .pipe(concat(options.css.destFile))
        .pipe(gulp.dest(options.css.destDir));

    // vendor.js
    gulp.src(options.css.vendorFiles)
        // .pipe(uglify({ mangle: false }))
        .pipe(concat(options.css.destVendorFile))
        .pipe(gulp.dest(options.css.destDir));
});

// -------------------------------------
//   Task: Default
// -------------------------------------

gulp.task('default', function() {
    watch(options.js.files, function(files) {
        gulp.start('javascript');
    });
});

