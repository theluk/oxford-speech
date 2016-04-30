var gulp = require('gulp');
var request = require('request');
var del = require('del');
var fs = require('fs');

const JSFILE = 'https://raw.githubusercontent.com/Microsoft/ProjectOxford-ClientSDK/master/Speech/Speech.JS/speech.1.0.0.js';

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['speech.js']);
});

gulp.task('copy-original', ['clean'], function () {
  return request({url:JSFILE})
    .pipe(require('stream').PassThrough())
    .pipe(fs.createWriteStream('speech.js'));
}); 