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

// Common
import concat from "gulp-concat";

// Variables/Constantes
const cssPlugins = [cssnano(), autoprefixer()];

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

gulp.task("default", () => {
  gulp.watch("./src/*.html", gulp.series("html-min"));
  gulp.watch("./src/**/*.css", gulp.series("styles"));
  gulp.watch("./src/**/*.js", gulp.series("babel"));
});
