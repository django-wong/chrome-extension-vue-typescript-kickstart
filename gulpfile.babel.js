// generated on 2018-05-16 using generator-chrome-extension 0.7.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import {stream as wiredep} from 'wiredep';
import webpackstream from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/styles/*',
    'app/_locales/**',
    'app/scripts/vendors.js',
    '!app/scripts.typescript',
    '!app/styles.scss',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html',  () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: false,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js'
        ]
      }
  }))
  .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});

const bundle = function(src, dest, options= {}){
  return () => {
    let o = require('./webpack.config.js');
    return gulp.src(src)
      .pipe(named())
      .pipe(webpackstream(Object.assign({}, o, options), webpack))
      .pipe(gulp.dest(dest));
  }
};

gulp.task('bundle', bundle('app/scripts.typescript/**/*.ts', 'app/scripts'));
gulp.task('bundle-watch', bundle('app/scripts.typescript/**/*.ts', 'app/scripts', {watch: true}));
gulp.task('bundle-style', bundle('app/styles.scss/**/*.scss', 'app/styles'));
gulp.task('bundle-style-watch', bundle('app/styles.scss/**/*.scss', 'app/styles', {watch: true}));


gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
gulp.task('clean-all', del.bind(null, ['.tmp', 'dist', 'app/scripts', 'app/styles']));

gulp.task('watch', ['bundle-watch', 'bundle-style-watch'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json'
  ]).on('change', $.livereload.reload);

  gulp.watch(['app/scripts.typescript/**/*.ts', 'app/templates/**/*.vue'], ['bundle']);
  gulp.watch(['app/styles.scss/**/*.scss'], ['bundle-style']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('package', ['build'], function () {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('Mindbody Extension-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
  runSequence(
    'bundle', 'bundle-style', 'chromeManifest',
    ['html', 'images', 'extras'],
    'size', cb);
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});
