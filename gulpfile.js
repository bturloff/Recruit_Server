var gulp = require('gulp');

var srcPath = [
  '**/*',
  '!gulpfile.js',
  '!.*'
];

gulp.task('build', function () {
  return gulp.src(srcPath)
    .pipe(gulp.dest('dist/'))
});
