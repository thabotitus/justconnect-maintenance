// 'use strict'
import gulp from "gulp";
import zip from "gulp-zip";
import fs from "fs";
import clean from "gulp-clean";
import { DISTRIBUTION_FOLDERS, DOWNLOADS_FOLDER, TASKS } from "./config.js";

const version = JSON.parse(fs.readFileSync("version.json")).version;
const PACKAGE_NAME = `TTS_WEB_STARTER_KIT_v${version}.zip`;

gulp.task("cleanup", () => {
  return gulp
    .src(DOWNLOADS_FOLDER, { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task("zipItUp", () => {
  return gulp
    .src(`${DISTRIBUTION_FOLDERS.ROOT}/**`)
    .pipe(zip(PACKAGE_NAME))
    .pipe(gulp.dest(DOWNLOADS_FOLDER));
});

gulp.task(TASKS.PACKAGE, gulp.series(["cleanup", "zipItUp"]));
