var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pug = require("gulp-pug");
var sass = require("gulp-sass");

function pugF() {
  return gulp
    .src("./src/pug/*.pug")
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(gulp.dest("./public"))
    .pipe(browserSync.stream());
}

function sassF() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
}

gulp.task("views", pugF);

gulp.task("sass", sassF);

// Static server
gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
  gulp.watch("./src/**/*.pug", pugF);
  gulp.watch("./src/sass/**/*.scss", sassF);
});
