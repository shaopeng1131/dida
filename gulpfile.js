var gulp = require('gulp'),
    shell = require('gulp-shell'),
    del = require('del'),
    packager = require('electron-packager'),
    builder = require('electron-builder'),
    argv = require('yargs').argv



gulp.task('pkg:packager', function () {
  var name = argv.site === 'dida' ? 'dida' : 'ticktick'
  var opts = {
    'dir': './app',
    'arch': 'all',
    'platform': 'win32,darwin',
    'all': false,
    'app-category-type': 'public.app-category.utilities',
    'app-version': '1.0.0',
    'asar': true,
    'icon': './app/icons/icon.png',
    // 'ignore': /node_modules/,
    'name': name,
    'out': './pkg',
    'overwrite': true
  }
  packager(opts, function done (err, appPath) {
    console.log(appPath)
  })
})

gulp.task('pkg:clean', function () {
  del(['./pkg'])
})

gulp.task('pkg:builder:dida', shell.task([
  'electron-builder \"pkg/dida-darwin-x64/dida.app\" --platform=osx --out=\"pkg/pkg/osx\" --config=builder.json',
  'electron-builder \"pkg/dida-win32-x64\" --platform=win --out=\"pkg/pkg/win64\" --config=builder.json',
  'electron-builder \"pkg/dida-win32-ia32\" --platform=win --out=\"pkg/pkg/win32\" --config=builder.json'
]))

gulp.task('pkg:builder:tick', shell.task([
  'electron-builder \"pkg/ticktick-darwin-x64/ticktick.app\" --platform=osx --out=\"pkg/pkg/osx\" --config=builder-tick.json',
  'electron-builder \"pkg/ticktick-win32-x64\" --platform=win --out=\"pkg/pkg/win64\" --config=builder-tick.json',
  'electron-builder \"pkg/ticktick-win32-ia32\" --platform=win --out=\"pkg/pkg/win32\" --config=builder-tick.json'
]))

gulp.task('pkg:dida', shell.task([
  'gulp pkg:clean',
  'gulp pkg:packager --site dida',
  'gulp pkg:builder:dida'
]))

gulp.task('pkg:tick', shell.task([
  'gulp pkg:clean',
  'gulp pkg:packager --site tick',
  'gulp pkg:builder:tick'
]))
