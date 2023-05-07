"use strict"

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const del = require("del");
const rigger = require("gulp-rigger");
const browserSync = require("browser-sync").create();
const ghPages = require("gulp-gh-pages");

/* Paths */
const srcPath = "src/"
const distPath = "dist/"

const path = {
  build: {
    html: distPath,
    css: distPath + "assets/css",
    js: distPath + "assets/js/",
    images: distPath + "assets/images",
    favicon: distPath,
  },
  src: {
    html: srcPath + "*.html",
    css: srcPath + "assets/scss/*.scss",
    js: srcPath + "assets/js/*.js",
    images: srcPath + "assets/images/*",
    favicon: srcPath + "assets/favicon/*",
  },
  watch: {
    html: srcPath + "**/*.html",
    css: srcPath + "assets/scss/**/*.scss",
    js: srcPath + "assets/js/**/*.js",
    images: srcPath + "assets/images/*",
    favicon: srcPath + "assets/favicon/*",
  },
  deploy: {
    src: distPath + "/**",
    dest: "./build",
  },
  clean: "./" + distPath
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath
    }
  })
}

function html() {
  return src(path.src.html, { base: srcPath })
  .pipe(plumber()) 
  .pipe(dest(path.build.html))
  .pipe(browserSync.reload({ stream:true }))
}

function favicon() {
  return src(path.src.favicon)
  .pipe(plumber()) 
  .pipe(dest(path.build.favicon))
}

function css() {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
  .pipe(plumber())
  .pipe(sass({}))
  .pipe(autoprefixer())
  .pipe(cssbeautify())
  .pipe(dest(path.build.css))
  .pipe(cssnano({
    zindex: false,
    discardComments: {
      removeAll: true
    }
  }))
  .pipe(removeComments())
  .pipe(rename({
    suffix: "min",
    extname: ".css"
  }))
  .pipe(dest(path.build.css))
  .pipe(browserSync.reload({ stream:true }))
}

function js() {
  return src(path.src.js, { base: srcPath + "assets/js/" })
  .pipe(plumber()) 
  .pipe(rigger())
  .pipe(dest(path.build.js))
  .pipe(uglify())
  .pipe(rename({
    suffix: "min",
    extname: ".js"
  }))
  .pipe(dest(path.build.js))
  .pipe(browserSync.reload({ stream:true }))
}

function images() {
  return src(path.src.images, { base: srcPath + "assets/images/" })
  .pipe(dest(path.build.images))
  .pipe(browserSync.reload({ stream:true }))
}

function clean() {
  return del(path.clean)
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.images], images)
  gulp.watch([path.watch.favicon], favicon)
}

function deploy() {
  return src(path.deploy.src)
  .pipe(ghPages())
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, favicon))
const watch = gulp.parallel(build, watchFiles, serve)
const published = gulp.series(build, deploy)

exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.favicon = favicon
exports.clean = clean
exports.deploy = deploy
exports.build = build
exports.watch = watch
exports.published = published
exports.default = watch