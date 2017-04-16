/*eslint one-var: 0 */

// Core deps
// Use require() because of rollup
const gulp = require('gulp');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const gulprun = require('run-sequence');
const yargs = require('yargs');
const browserSync = require('browser-sync');
const wct = require('web-component-tester');

// Processing
const processInline = require('gulp-process-inline');
const minify = require('gulp-htmlmin');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

const bs = browserSync.create(),
      argv = yargs.boolean(['debug']).argv,
      errorNotifier = () => plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
      OPTIONS = {
        HTMLmin: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          caseSensitive: true,
          keepClosingSlash: true,
          customAttrAssign: [/\$=/],
          minifyCSS: true,
          minifyJS: true
        },
        browserSync: {
          server: {
            baseDir: './',
            index: 'demo/index.html',
            routes: {
              '/': './bower_components'
            }
          },
          open: false,
          notify: false
        }
      };

gulp.task('build', () => {
  let scripts = processInline();

  return gulp.src(['src/*.html'])
          .pipe(errorNotifier())

          // JS
          .pipe(scripts.extract('script'))
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(gulpif(!argv.debug, eslint.failAfterError()))
            .pipe(babel())
          .pipe(scripts.restore())

          .pipe(gulpif(!argv.debug, minify(OPTIONS.HTMLmin)))

          .pipe(size({ gzip: true }))
        .pipe(gulp.dest('.'))
});

wct.gulp.init(gulp);

gulp.task('serve', () => bs.init(OPTIONS.browserSync));
gulp.task('refresh', () => bs.reload());

gulp.task('test', ['build', 'test:local']);

gulp.task('watch', () => gulp.watch(['src/**/*'], () => gulprun('build', 'refresh')));

gulp.task('default', ['build', 'serve', 'watch']);
