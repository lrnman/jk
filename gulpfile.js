/**
 * Created by Jerry on 2017/5/25.
 */
var gulp = require('gulp')
var webServer = require('gulp-webserver');

gulp.task('server', function () {
    gulp.src('./').pipe(webServer({ // 运行gulp-webserver
        livereload: true, // 启用LiveReload
        open: true // 服务器启动时自动打开网页
    }));
});

gulp.task('default', ['server']);