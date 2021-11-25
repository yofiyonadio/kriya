var gulp = require('gulp');
var install = require('gulp-install');

const PROD_DEST = './build';

gulp.task('prod', function () {
    return gulp.src(['./package.json', './env/prod/.env'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        }));
});

gulp.task('docker', function () {
    return gulp.src(['./package.json', './env/docker/.env'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        }));
});