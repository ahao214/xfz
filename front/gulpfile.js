var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var tinypng_nokey = require('gulp-tinypng-nokey');
var bs = require("browser-sync").create();
var sass = require("gulp-sass");
var util = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");



//html任务
gulp.task("html",done =>{
	gulp.src("./templates/**/*.html")
    .pipe(bs.reload({
		stream: true
	}));
	done();
});


// css任务
gulp.task("css",done =>{
	gulp.src("./src/css/*.scss")
	.pipe(sass().on("error",sass.logError))
	.pipe(cssnano())   //压缩
	.pipe(rename({"suffix":".min"}))  //加后缀名
	.pipe(gulp.dest('./dist/css/'))   //压缩后存放的路径
    .pipe(bs.reload({
		stream: true
	}));
	done();
});

//js任务
gulp.task("js",done =>{
	gulp.src("./src/js/*.js")
	.pipe(sourcemaps.init())
	.pipe(uglify().on('error',util.log))
	.pipe(rename({"suffix":".min"}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dist/js/'))
	.pipe(bs.reload({
		stream: true
	}));
	done();
});

//images任务
gulp.task("images",done =>{
	gulp.src("./src/images/*.*")
	.pipe(tinypng_nokey())
	.pipe(gulp.dest('./dist/images/'))
	.pipe(bs.reload({
		stream: true
	}));
	done();
});

//监听
gulp.task('auto',function () {
    gulp.watch("./templates/**/*.html",gulp.series('html'));
    gulp.watch("./src/css/*.scss",gulp.series('css'));
    gulp.watch("./src/js/*.js",gulp.series('js'));
    gulp.watch("./src/images/*.*",gulp.series('images'));
});

//初始化
gulp.task("bs",function () {
	bs.init({
		'server':{
			'baseDir':'./',
		}
	})
});

//创建一个默认任务
gulp.task("default",gulp.parallel('bs','auto'));



