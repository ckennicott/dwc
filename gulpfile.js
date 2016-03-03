var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var modRewrite  = require('connect-modrewrite');
var browserify  = require('browserify');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var connect     = require('gulp-connect');
var usemin      = require('gulp-usemin');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var rimraf      = require('gulp-rimraf');
var reload      = browserSync.reload;
var sitemap = require('gulp-sitemap');

gulp.task('fix-template', ['css'], function() {
    return gulp.src('dist/index.src.html')
        .pipe(rimraf())
        .pipe(rename("index.html"))
        .pipe(gulp.dest('dist'));
});

gulp.task('sitemap', function () {
    gulp.src('dist/partials/*.html')
        .pipe(sitemap({
            siteUrl: 'http://drunkwithchuck.com'
        }))
        .pipe(gulp.dest('./dist'));
});


// process JS files and return the stream.
gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/dwc.js',
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


gulp.task('css', function() {
   return gulp.src('src/index.src.html')
        .pipe(usemin({
            assetsDir: './',
            css: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest('dist'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            middleware: [
            modRewrite([
            '!\\.\\w+$ /index.html [L]'
            ])
          ]
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['javascript']);
    gulp.watch('src/**/*.css', ['fix-template']);
    gulp.watch(['dist/css/site.css', 'dist/js/app.js', 'dist/partials/*.html']).on('change', reload);
})

gulp.task('default', ['browser-sync', 'watch', 'css', 'javascript', 'fix-template'])
