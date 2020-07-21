const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-clean-css');
const plumberNotifier = require('gulp-plumber-notifier');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const imageminjpegCrompress = require('imagemin-jpeg-recompress');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const csscomb = require('gulp-csscomb');
const browserSync = require('browser-sync').create();
const prettyHtml = require('gulp-pretty-html');
const nunjucksRender = require('gulp-nunjucks-render');

//path 
const files = {
    output: 'dist',
    templates: 'src/templates',
    pages: 'src/pages',
    sass_path: 'src/sass/**/*.{sass,scss}',
    css_path: 'src/css/**/*.css',
    plugins_path: 'src/js/plugins/**/*.js',
    main_js_path: 'src/js/main.js',
    fonts_path: 'src/fonts/**/*',
    jquery_js_path: 'src/js/jquery-2.2.4.min.js',
    image_path: 'src/images/**/*.{png,jpeg,jpg,svg,gif,ico}'
};

var autoprefixerOption = [
    "last 2 version",
    "> 1%",
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4",
    "bb >= 10"
];

function serve(done) {
    browserSync.init({
        server: {
            baseDir: files.output
        },
    });
    done();

}

function nunjucks(done) {
    console.log("Rendering nunjucks files..");
    return src(files.pages + '/**/*.+(html|js|css)')
        .pipe(nunjucksRender({
            path: [files.templates],
            watch: true,
        }))
        .pipe(plumberNotifier())
        .pipe(prettyHtml({
            indent_size: 4,
            indent_char: ' ',
            unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
            extra_liners: ['head', 'body'],
            max_preserve_newlines: 1
        }))
        .pipe(dest(files.output))
        .pipe(browserSync.stream());
    done();
}



function sassCompile() {
    console.log('sass task start');
    return src(files.sass_path)
        .pipe(plumberNotifier())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOption))
        .pipe(csscomb())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(files.output + "/" + 'assets/css'))
        .pipe(browserSync.stream())
        .pipe(rename({ suffix: ".min" }))
        .pipe(minifyCss())
        .pipe(dest(files.output + "/" + 'assets/css'));
}

function scriptsTask() {
    console.log('script task start');
    return src(['src/js/plugins/popper.min.js', files.plugins_path])
        .pipe(plumberNotifier())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('rt-plugins.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(files.output + "/" + "assets/js"))
        .pipe(browserSync.stream());
}

function appJstask() {
    return src(files.main_js_path)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(plumberNotifier())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(dest(files.output + "/" + "assets/js"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(files.output + "/" + "assets/js"))
        .pipe(browserSync.stream());
}

function csspluginTask() {
    console.log('css plugin task start');
    return src(files.css_path)
        .pipe(plumberNotifier())
        .pipe(concat('rt-plugins.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(files.output + "/" + "assets/css"))
        .pipe(browserSync.stream());
}

function imagetask() {
    return src(files.image_path)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngQuant(),
                imageminjpegCrompress()
            ]
        ))
        .pipe(dest(files.output + "/" + "assets/images"))
        .pipe(browserSync.stream());
}

function copyfonts() {
    return src(files.fonts_path)
        .pipe(gulp.dest(files.output + "/" + "assets/fonts"))
        .pipe(browserSync.stream());
}

function copycss() {
    return src(files.css_path)
        .pipe(gulp.dest(files.output + "/" + "assets/css"))
        .pipe(browserSync.stream());
}

function copyjs(){
    return gulp.src(files.plugins_path)
        .pipe(gulp.dest(files.output + "/" + "assets/js"))
        .pipe(browserSync.stream());
}


function copyjs2(){
    return gulp.src(files.jquery_js_path)
        .pipe(gulp.dest(files.output + "/" + "assets/js"))
        .pipe(browserSync.stream());
}


function copysass(){
    return gulp.src(files.sass_path)
        .pipe(gulp.dest(files.output + "/" + "assets/sass"))
        .pipe(browserSync.stream());
}

function dlt_dist(){
    return del.sync([
        files.output

    ]);
}

function reload(done) {
    browserSync.reload();
    done();
}

function watchfiles() {
    watch([files.sass_path], series(sassCompile, reload));
    watch([files.css_path], series(csspluginTask, reload));
    watch([files.main_js_path], series(appJstask, reload));
    watch([files.plugins_path], series(scriptsTask, reload));
    watch([files.image_path], series(imagetask, reload));
    watch([files.fonts_path], series(copyfonts, reload));
    watch(['src/templates/**/*.html', 'src/pages/**/*.html'], series(nunjucks, reload));
    watch(files.output + '/*').on('change', browserSync.reload);
}

exports.default = parallel(
    dlt_dist,
    nunjucks,
    sassCompile,
    appJstask,
    scriptsTask,
    csspluginTask,
    imagetask,
    copyfonts,
    copycss,
    copyjs,
    copyjs2,
    //copysass,
    reload,
    serve,
    watchfiles

);