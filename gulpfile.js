"use strict";

var gulp = require("gulp"),
  prefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  rigger = require("gulp-rigger"),
  uglify = require("gulp-uglify-es").default,
  cssmin = require("gulp-clean-css"),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: {
    //Тут мы укажем куда складывать готовые после сборки файлы
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/"
  },
  src: {
    //Пути откуда брать исходники
    html: "src/index.html", //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: "src/js/main.js", //В стилях и скриптах нам понадобятся только main файлы
    style: "src/style/main.scss",
    img: "src/img/**/*.*"
  },
  watch: {
    //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/style/**/*.scss",
    img: "src/img/**/*.*"
  },
  clean: "./build"
};

// запуск сервера
gulp.task("server", function() {
  browserSync({
    port: 3000,
    server: {
      baseDir: path.build.html,
      middleware: function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
      }
    }
  });
});

// сборка HTML
gulp.task("html:build", function() {
  return gulp
    .src(path.src.html) //Выберем файлы по нужному пути
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});
// собираем JS
gulp.task("js:build", function() {
  return gulp
    .src(path.src.js) //Найдем наш main файл
    .pipe(rigger()) //Прогоним через rigger
    .pipe(uglify()) //Сожмем наш js
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({ stream: true })); //И перезагрузим сервер
});
// собираем стили
gulp.task("style:build", function() {
  return gulp
    .src(path.src.style) //Выберем наш main.scss
    .pipe(sass().on("error", sass.logError))
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cssmin({ compatibility: "ie8" })) //Сожмем
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({ stream: true }));
});

gulp.task("image:build", function() {
  return gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({ stream: true }));
});

gulp.task(
  "build",
  gulp.parallel("html:build", "js:build", "style:build", "image:build")
);

gulp.task("watch", function() {
  gulp.watch(path.watch.html, gulp.parallel("html:build"));
  gulp.watch(path.watch.style, gulp.parallel("style:build"));
  gulp.watch(path.watch.js, gulp.parallel("js:build"));
  gulp.watch(path.watch.img, gulp.parallel("image:build"));
});

gulp.task("default", gulp.parallel("build", "server", "watch"));
