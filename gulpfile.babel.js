// HTML
import htmlmin from "gulp-htmlmin";

// CSS
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

// Javascript
import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";

// PUG
import pug from "gulp-pug";

// Sass
import sass from "gulp-sass";

// Common
import concat from "gulp-concat";

// Clean css
import clean from "gulp-purgecss";

// Variables/Constantes
const cssPlugins = [cssnano(), autoprefixer()];
const production = false;

gulp.task("html-min", () => {
  return gulp
    .src("./src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("styles", () => {
  return gulp
    .src("./src/**/*.css")
    .pipe(concat("styles.min.css"))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest("./public/css"));
});

gulp.task("babel", () => {
  return gulp
    .src("./src/**/*.js")
    .pipe(concat("script.min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("./public/js"));
});

gulp.task("views", () => {
  return gulp
    .src("./src/views/pages/*.pug")
    .pipe(
      pug({
        pretty: !production,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./public/css"));
});

gulp.task("clean", () => {
  return gulp
    .src("./public/css/styles.css")
    .pipe(
      clean({
        content: ["./public/*.html"],
      })
    )
    .pipe(gulp.dest("./public/css"));
});

gulp.task("default", () => {
  // gulp.watch("./src/*.html", gulp.series("html-min"));
  // gulp.watch("./src/**/*.css", gulp.series("styles"));
  gulp.watch("./src/views/**/*.pug", gulp.series("views"));
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/**/*.js", gulp.series("babel"));
});
