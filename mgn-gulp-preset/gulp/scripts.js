const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const watchify = require("watchify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const gulpIf = require("gulp-if");
const gulpLoadPlugins = require("gulp-load-plugins");

const $ = gulpLoadPlugins();

module.exports = (setting,watching,buildType) => {

    const bundle = (watching = false) => {

        if( buildType ) watching = false;

        // コンパイル対象ファイルのディレクトリ名
        const srcDir = setting.src;

        // コンパイル先ディレクトリ
        const distDir = setting.dist;

        // コンパイル対象のファイル名
        const sources = setting.fileName;

        sources.forEach((entryPoint) => {

            // browserifyに渡すオプション群
            const browserifyOptions = {
                // コンパイル対象となるファイル
                entries: [srcDir + '/' + entryPoint],
                transform: [["babelify", { "presets": ["env"] }]],
                debug: true,
                //watchifyの差分ビルドを有効化
                cache: {},
                packageCache: {},
                plugin: (watching) ? [watchify] : null
            };

            // 対象ファイルが変更されたら、バンドル処理を行う。
            var b = browserify(browserifyOptions)
            .on('update', () => {
                execBundle();
                console.log('scripts rebuild');
            });

            function execBundle() {

                return b.bundle()
                    .on('error', (err) => {
                        console.log(err.message);
                    })
                    .pipe($.plumber())
                    .pipe(source(entryPoint))
                    .pipe(buffer())
                    .pipe($.sourcemaps.init({loadMaps: true}))
                    .pipe($.uglify())
                    .pipe( gulpIf( !buildType, $.sourcemaps.write()) )
                    .pipe(gulp.dest(distDir));
            };

            return execBundle();
        });

    };

    bundle(watching);

};
