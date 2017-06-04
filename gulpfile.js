var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var superset = require('supertest');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: { port: 3000, ip: 'localhost'},
        ignore: ['./node_modules/**']
    }).on('restart', function(){
        console.log('Restarting....');
    });
});

gulp.task('test', function(){
    gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
})