const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const path = require('path');

// Функция для создания директорий
function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Задача для создания директорий
gulp.task('create-directories', function(done) {
    createDir('dist/css');
    createDir('dist/js');
    createDir('dist/images');
    createDir('dist/fonts');
    done();
});

// Задача для компиляции SCSS в CSS
gulp.task('styles', function() {
    return gulp.src('app/scss/*.scss') // Основной SCSS файл
        .pipe(sass().on('error', sass.logError)) // Компиляция SCSS
        .pipe(gulp.dest('dist/css')) // Выходной каталог
        .pipe(browserSync.stream()); // Обновление браузера
});

// Задача для минификации JavaScript
gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js') // Исходные файлы JavaScript
        .pipe(terser()) // Минификация
        .pipe(gulp.dest('dist/js')) // Выходной каталог
        .pipe(browserSync.stream()); // Обновление браузера
});

// Задача для копирования изображений
gulp.task('images', function() {
    return gulp.src('app/images/**/*') // Исходные файлы изображений
        .pipe(gulp.dest('dist/images')); // Выходной каталог
});

// Задача для копирования шрифтов
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*') // Исходные файлы шрифтов
        .pipe(gulp.dest('dist/fonts')); // Выходной каталог
});

// Задача для автоматического обновления браузера
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./" // Корневой каталог
        }
    });

    gulp.watch('app/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('app/js/**/*.js', gulp.series('scripts'));
    gulp.watch('app/images/**/*', gulp.series('images'));
    gulp.watch('app/fonts/**/*', gulp.series('fonts'));
    gulp.watch('*.html').on('change', browserSync.reload); // Перезагрузка при изменении HTML
});

// Задача по умолчанию
gulp.task('default', gulp.series('create-directories', 'styles', 'scripts', 'images', 'fonts', 'serve'));
