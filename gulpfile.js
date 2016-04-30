const gulp = require('gulp');
const request = require('request');
const del = require('del');
const fs = require('fs');
const template = require('gulp-template');
const rename = require('gulp-rename');

const JSFILE = 'https://raw.githubusercontent.com/Microsoft/ProjectOxford-ClientSDK/master/Speech/Speech.JS/speech.1.0.0.js';

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['_speech.js', 'speech.js']);
});

gulp.task('copy-original', ['clean'], function () {
  return request({url:JSFILE})
    .pipe(require('stream').PassThrough())
    .pipe(fs.createWriteStream('_speech.js'));
});

gulp.task('build', function() {
    try {
        var content = fs.readFileSync('_speech.js').toString();    
    } catch (error) {
        console.error("ERROR: _speech.js does not exist, try running `gulp copy-original` first");
        return false;
    }
    // fix. Microsoft calls initialization when loading the module. 
    // this throws errors when in node 
    content = content.replace('SpeechMain();', 'Bing.SpeechMain = SpeechMain;');
    
    gulp.src(['template.js.tmpl'])
        .pipe(template({
            content : content
        }))
        .pipe(rename('speech.js'))
        .pipe(gulp.dest('./'));
})