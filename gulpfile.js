'use strict';

/**
**
** Setting
**
**/

const SETTING = {

    'zip': [
        {
            'fileName' :"mgn-gulp-preset",// Name of output file
            'version' :  "", // version of output file
            'from' : [
                './mgn-gulp-preset/**/*'
            ],
            'to' : './' //output directry
        }
    ]

}


/**
**
** Module Import
**
**/

const gulp = require("gulp");
const Zip = require("./gulp/zip");


/**
**
** Task
**
**/
gulp.task('zip', (done) => {
    Zip(SETTING);
    done();
});


/**
**
** Default Task
**
** コマンド'gulp'で実行される
**
**/

gulp.task(
    "default",
    gulp.series(gulp.parallel(
        "zip"
    ))
);
