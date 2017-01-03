const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const babel = require('gulp-babel');


const browser_js_path = './static/js/app.js';
const server_paths = ['./server.js', './middleware/**/*.js'];

const sass_paths = require('bourbon').includePaths.concat(require('bourbon-neat').includePaths);

//might have to rework this one with bourbon.io
gulp.task('sass', function(){
    return gulp.src('static/scss/app.scss')
        .pipe(plugins.sass({
                includePaths: sass_paths
            })
            .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('static/bin'));
});

// Add react.
gulp.task('browser_js', function(){
    browserify(browser_js_path)
        .transform(babelify, {
            "presets": ["es2015", "stage-2", "react"]
        })
        .bundle().on('error', function (error) {
            console.log(error.toString());
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static/bin'));
});

// I am not using Koa so I am going to do my best to not have to compile server-side js.

// gulp.task('server', function(){
//     gulp.src(server_paths, {
//             base: '.'
//         })
//         .pipe(babel({
//             presets: ['es2015', 'stage-2']
//         }))
//         .pipe(gulp.dest('dist'));
//
//     const static_paths = [
//         './static/bin/**/*.css', './static/bin/**/*.js', './static/bin/**/*.eot',
//         './static/bin/**/*.svg', './static/bin/**/*.ttf', './static/bin/**/*.woff', './static/bin/**/*.less',
//         './static/bin/**/*.scss', './static/bin/**/*.jpg', './static/bin/**/*.png', './static/bin/**/*.mp4',
//         './static/bin/**/*.gif', './static/bin/**/*.woff2'
//     ];
//     const view_path = './views/**/*.html';
//
//     gulp.src(static_paths, {
//         base: '.'
//     }).pipe(gulp.dest('dist'));
//
//     gulp.src(view_path, {
//         base: '.'
//     }).pipe(gulp.dest('dist'));
// });

gulp.task('watch', function(){
    gulp.watch(['static/**/*.scss'], ['sass']);
    gulp.watch(['static/**/*.js', '!static/bin/*.js'], ['browser_js']);
    //gulp.watch(['!static/img/*'], ['img']);
});

gulp.task('default', ['watch', 'sass', 'browser_js']);
