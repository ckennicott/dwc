var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var modRewrite = require('connect-modrewrite');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


// process JS files and return the stream.
gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './js/dwc.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});



// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            middleware: [
            modRewrite([
            '!\\.\\w+$ /index.html [L]'
            ])
          ]
        }
        // files: ["css/main.css", "js/ngdwc.js"]
    });
});
