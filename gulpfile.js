var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var Builder = require('systemjs-builder');

var tsProject = typescript.createProject('src/tsconfig.app.json');
var builder = new Builder("/", "src/share/systemjs/systemjs.config.js");

gulp.task('tsc', function(){
    return gulp
    .src([
        "src/**/*.ts",
        "typings/*.d.ts"
    ])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html+css', function(){
    return gulp
    .src([
        "src/**/*.html", 
        "src/**/*.css",
        "src/**/*.ico"])
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-vendor", function(){
    return gulp
    .src([
        "node_modules/core-js/client/shim.min.js", 
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/@angular/**/*",
        "node_modules/@swimlane/ngx-charts/**/*",
        "node_modules/d3-**/**/*",
        "node_modules/rxjs/**/*",
        "node_modules/jquery/dist/**/*",
        "node_modules/bootstrap/dist/**/*",
        "node_modules/startbootstrap-sb-admin-2/dist/**/*",
        "node_modules/systemjs-plugin-babel/**/*"], {base: "./"})
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-ts", function(){
    return gulp
    .src([
        "src/**/*.ts"], {base: "./"})
        .pipe(gulp.dest("dist"));
});

gulp.task('systemjs', function(){
    return gulp
    .src(["src/share/systemjs/systemjs.config.js"])
        .pipe(gulp.dest("dist/share/systemjs/"));
});

gulp.task('clean', function () {
    return gulp.src(["dist"], {read: false})
        .pipe(clean());
});

gulp.task('build-js', function(){
    builder
    .bundle('dist/**/*.js - [dist/**/systemjs*.js] - [dist/billing/**/*.js]', 'dist/care/care-bundle.js', { minify: false, sourceMaps: true })
    .then(function() {
        console.log('Build care complete');
      })
      .catch(function(err) {
        console.log('Build error in care');
        console.log(err);
      });
      builder
      .bundle('dist/billing/*.js', 'dist/billing/billing-bundle.js', { minify: false, sourceMaps: true })
      .then(function() {
          console.log('Build billing complete');
        })
        .catch(function(err) {
          console.log('Build error in billing');
          console.log(err);
        });

});

gulp.task('default', ['clean'], function(callback) {
    runSequence(['tsc','systemjs'] , ['build-js'], ['html+css', 'copy-vendor', 'copy-ts'], callback);
});