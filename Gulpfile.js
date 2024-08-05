import gulp from "gulp";
import gulpCssnano from "gulp-cssnano";
import sass from "gulp-sass";

gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
});
