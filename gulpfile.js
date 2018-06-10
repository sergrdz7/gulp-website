

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');

//image compression plugins
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');



//FILE PATHS
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

// //STYLES WITH CSS
// gulp.task('styles', function(){
//   console.log('starting styles task');
//   //Make sure to set the right order with reset styles first
//   return gulp.src(['public/css/reset.css',CSS_PATH])
//     //error handling with plumber
//     .pipe(plumber( function(err) {
//       console.log('Styles task error');
//       console.log(err);
//       this.emit('end');
//     }))
//     //start sourcemaping
//     .pipe(sourcemaps.init())
//     //add autopreixing to styles
//     .pipe(autoprefixer())
//     //call concat function and pass destination file
//     .pipe(concat('style.css'))
//     //minify files
//     .pipe(minifyCss())
//     //write sourcemaps to new files
//     .pipe(sourcemaps.write())
//     //set destination
//     .pipe(gulp.dest(DIST_PATH))
//     //live reload triggered when styles are compiled
//     .pipe(livereload());
// });

//STYLES WITH SASS
gulp.task('styles', function(){
  console.log('starting styles task');
  //Only include main path to scss file
  return gulp.src('public/scss/style.scss')
    //error handling with plumber
    .pipe(plumber( function(err) {
      console.log('Styles task error');
      console.log(err);
      this.emit('end');
    }))
    //start sourcemaping
    .pipe(sourcemaps.init())
    //add autopreixing to styles
    .pipe(autoprefixer())
    //call SASS
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    //write sourcemaps to new files
    .pipe(sourcemaps.write())
    //set destination
    .pipe(gulp.dest(DIST_PATH))
    //live reload triggered when styles are compiled
    .pipe(livereload());
});

//SCRIPTS
gulp.task('scripts', function(){
  console.log('running scripts');
  //get all js files and pipe ugligy into them
  return gulp.src(SCRIPTS_PATH)
    //set plumner debugger
    .pipe(plumber(function (err) {
      console.log('Scripts Task Error');
      console.log(err);
      this.emit('end');
    }))
    //initialize sourcemaps
    .pipe(sourcemaps.init())
    //use babel to compile ES2015
    .pipe(babel({
      presets: 'env'
    }))
    //use uglify to minify them
    .pipe(uglify())
    //conatenate multilple files into one
    .pipe(concat('scripts.js'))
    //write sourcemaps to new files
    .pipe(sourcemaps.write())
    //set destination
    .pipe(gulp.dest(DIST_PATH))
    //livereload triggered when scripts run
    .pipe(livereload());
});

//IMAGES
gulp.task('images', function(){
  return gulp.src(IMAGES_PATH)
  .pipe(imagemin(
    [
      imagemin.gifsicle(),
      imagemin.jpegtran(),
      imagemin.optipng(),
      imagemin.svgo(),
      imageminPngquant(),
      imageminJpegRecompress()
    ]
  ))
  .pipe(gulp.dest(DIST_PATH + '/images'));

})

//CLEAN TASK TO DELET FILES
gulp.task('clean', function() {
   return del.sync([
      DIST_PATH
   ]);
})

//DEFAULT
gulp.task('default',['clean','images','styles','scripts'], function(){
  console.log('Starting default task');
});

//EXPORT
gulp.task('export', function(){
  return gulp.src('public/**/*')
  .pipe(zip('website.zip'))
  .pipe(gulp.dest('./'))
})
//WATCH
gulp.task('watch',['default'], function(){
  console.log('starting watch task');
  //start server befor WATCH
  require('./server.js');
  livereload.listen();
  //watch(path,array of tasks to run)
  gulp.watch(SCRIPTS_PATH,['scripts']);
  // gulp.watch(CSS_PATH,['styles']);
  // watch sass files
  gulp.watch('public/scss/**/*.scss', ['styles']);
  // gulp.watch('public/index.html', ['html']);
});
