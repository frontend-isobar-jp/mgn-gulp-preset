# Download

[↓ Download zip file](https://github.com/frontend-isobar-jp/mgn-gulp-preset/blob/master/mgn-gulp-preset.zip?raw=true)

**ダウンロードしたファイルをプロジェクトルート直下に配置します。**

----
# npm install
```
npm i -D babel-core babel-preset-env babelify browser-sync browserify gulp gulp-autoprefixer gulp-if gulp-load-plugins gulp-plumber gulp-sass gulp-sourcemaps gulp-uglify-es vinyl-buffer vinyl-source-stream
```
----

# Gulp の設定に関して ( gulpfile.js )
- 最初に「# Initial」の項目で rootPath を設定してください。
- scss の compile には gulp-sass を利用しています。  
　デフォルトでは、「/assets/src/scss/」 → 「/assets/css/」 にcompileされるよう設定されています。
- Javascript は原則ES2015以降のルールに従い記述してください。  
　browserify, babelify, ... を利用し、compile しています。  
　デフォルトでは、「/assets/src/js/」 → 「/assets/js/」 にcompileされるよう設定されています。
- browser-sync はコメントアウトを外すとすぐに使うことができます。
- 使用しないものは、コメントアウトしてください。

----

# RUN

## ローカルサーバ起動
css、jsファイルともにsouceMapが有効なった状態で出力されます。  
デフォルトではhtml、css、jsファイルの変更に応じブラウザが auto reload します。

**!! npm v5.2.0 以上 !!**

```
$ npx gulp
```

## 本番用（production）ビルド
css、jsファイルともにsouceMapが無効なった状態で出力されます。
```
$ npx gulp build
```

___

# gulpfile.js
## Initial

最初にルートパスを設定します。
```
const rootPath = './';
```
___

## SASS | gulp-sass

### 1. Setting

'browser' には autoprefix のバージョン設定します。(必須)  
'outputStyle' には compile style を設定します。(必須)  
'path.src' には 監視ディレクトリを設定します。(必須)
'path.dist' には コンパイル先ディレクトリを設定します。(必須)

```
const setting = {

    'sass': [
        {
            'browser': ['last 2 versions'], // autoprefix version
            'outputStyle': 'compressed',// compile style
            'path': [
                {
                    'src': './src/scss/**/', // sass path
                    'dist': ROOT_PATH + 'assets/css/' // css path
                }
                // 対象ディレクトリを増やす場合は、オブジェクトを追加する
            ]
        }
    ],

}
```

### 2. Module Import
```
const Sass = require("./gulp/sass");
```

### 3. Task
```
gulp.task('sass', () => {
    Sass(SETTING);
});

gulp.task('watch', () => {

    SETTING.sass[0].path.forEach( function(e,i,entryPoint) {

        gulp.watch(SETTING.sass[0].path[i].src + '*.scss', ['sass']);

    });

});
```

### 4. Default Task
（ taskListへ記述することで、default起動するようになります。 ）
```
const taskList = [

    'sass'

]
```

___

## Scripts | browserify, babelify, ...

### 1. setting追加

'src' には 監視ディレクトリを設定します。(必須)  
'dist' には 出力ディレクトリを設定します。(必須)  
'fileName' には babelify の対象となるファイルを設定します。(必須)

```
const setting = {

    'js': [
        {
            'src': './src/js/',
            'dist': ROOT_PATH + 'assets/js/',
            'fileName': [ // main file
                'main.js'
            ]
        }
    ]

}
```

### 2. Module Import

```
const Scripts = require("./gulp/scripts");
```

### 3. task定義

```
gulp.task('scripts', () => {
    Scripts(SETTING);
});
gulp.task('watch', () => {

    SETTING.js.forEach( function(e,i) {
        gulp.watch(SETTING.js[i].src + '*.js', ['scripts']);
    });

});
```

### 4. Default Task
（ taskListへ記述することで、default起動するようになります。 ）
```
const taskList = [

    'scripts'

]
```

___

## browser-sync

### 1. setting追加

'port' には port を設定します。(必須)  
'target' には browserSyncを実行するための監視対象を設定します。(必須)

```
const setting = {

    'bs': [
        {
            'port': 9000, // browser-sync port
            'target': [ // browser-sync watch file
                '**/*.html',
                '**/assets/css/*.css',
                '**/assets/js/*.js'
            ],
        }
    ]

}
```


### 2. Module Import

```
const BrowserSync = require("./gulp/browser-sync");
```


### 3. task定義

```
gulp.task('serve', () => {

    BrowserSync(SETTING);

});
```


### 4. Default Task
（ taskListへ記述することで、default起動するようになります。 ）

```
const taskList = [

    'serve'

]
```
