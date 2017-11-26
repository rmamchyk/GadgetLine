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
    js: {
        vendorFiles: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        files: [
            'client/**/*.js'
        ],
        destFile: 'application.js',
        destVendorFile: 'vendor.js',
        destDir: 'public/js'
    },
    css: {
        files: [
            'client/css/**/*.css'
        ],
        vendorFiles: [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css'
        ],
        destVendorFile: 'vendor.css',
        destFile: 'application.css',
        destDir: 'public/css'
    }
};

// -------------------------------------
//   Task: javascript
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
//   Task: stylesheets
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
    watch(options.js.files.concat(options.js.vendorFiles), function() {
        run(['javascript']);
    });
    watch(options.css.files.concat(options.css.vendorFiles), function() {
        run(['stylesheets']);
    });
});

