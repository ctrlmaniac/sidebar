const { src, dest } = require("gulp");
const header = require("gulp-header");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const strip = require("gulp-strip-comments");
const gulp = require("gulp");
const babel = require("gulp-babel");

// Package.json
const pkg = require("./package.json");

// License Information
const banner = [
  "/**",
  " * <%= pkg.name %>",
  " * @license <%= pkg.license %>",
  " */",
  "",
].join("\n");

exports.default = function () {
  return src("./src/simpler-sidebar.js")
    .pipe(babel())
    .pipe(rename({ prefix: "jquery." }))
    .pipe(strip())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(dest("./lib/"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(dest("./lib/"));
};
