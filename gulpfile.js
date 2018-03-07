var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    clean = require('gulp-clean');

var config = {
    port:6005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        dist: './dist',
        images: './src/assets/*.png',
        mainJs: './src/main.js'
    }
};
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});
gulp.task('clean', function() {
    return gulp.src(config.paths.dist)
    .pipe(clean());
});
//opens index.html at port
gulp.task('open', ['connect'], function() {
    //gulp.src('dist/part1.html')
    gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});
gulp.task('images', ['html'], function() {
    gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.images,['images']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});
gulp.task('default', ['images', 'open', 'watch' ]);