/* jshint node:true */
'use strict';
// generated on 2015-01-09 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var uncss = require('gulp-uncss');

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    // .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
        // .pipe($.jshint.reporter('fail'));
});

gulp.task('templates', function () {
    var jade = require('gulp-jade');
    return gulp.src('app/templates/*.jade')
        // .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('html', ['styles'], function () {
    // var lazypipe = require('lazypipe');
    //  lazypipe()
    //     .pipe($.csso);
    var assets = $.useref.assets({
        searchPath: '{.tmp,app}'
    });

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        // Remove Any Unused CSS
        // .pipe($.if('*.css', uncss({
        //     html: [
        //         'app/index.html'
        //     ]
        // })))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('docs', function () {
    return gulp.src('app/docs/**/*')
        .pipe(gulp.dest('dist/docs'));
});

gulp.task('dbc-files', function () {
    return gulp.src('app/dbc-portfolio/**/*')
        .pipe(gulp.dest('dist/dbc-portfolio'));
})

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles'], function () {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(serveStatic('.tmp'))
        .use(serveStatic('app'))
        // paths to bower_components should be relative to the current file
        // e.g. in app/index.html you should use ../bower_components
        .use('/bower_components', serveStatic('bower_components'))
        .use(serveIndex('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'watch'], function () {
    require('opn')('http://localhost:9000');
});

var options = {
    remoteUrl: "https://github.com/carolineartz/carolineartz.github.io",
    branch: "master",
    force: true
};
gulp.task('deploy', function () {
    var deploy = require('gulp-gh-pages');
    gulp.src(["dist/**/*.*", "dist/CNAME"])
        .pipe(deploy(options));
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep())
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
    $.livereload.listen();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', $.livereload.changed);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/templates/**/*.jade', ['templates']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'templates', 'html', 'images', 'fonts', 'extras', 'docs', 'dbc-files'], function () {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
