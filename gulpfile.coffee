'use strict'

gulp		= require 'gulp'
coffee		= require 'gulp-coffee'
concat		= require 'gulp-concat'
insert		= require 'gulp-insert'
path		= require 'path'
coffeelint  = require 'gulp-coffeelint'
gutil       = require 'gulp-util'

gulp.task 'lib', ->
	gulp.src [ 'src/lib/**/*.coffee' ]
        .pipe coffeelint()
        .pipe coffeelint.reporter()
		.pipe coffee()
		.pipe concat 'pants.js'
		.pipe gulp.dest 'lib'
        .on 'error', gutil.log

gulp.task 'bin', ->
	gulp.src [ 'src/bin/**/*.coffee' ]
        .pipe coffeelint()
        .pipe coffeelint.reporter()
		.pipe coffee()
		.pipe concat 'pants.js'
		.pipe insert.prepend "#!/usr/bin/env node\n"
		.pipe gulp.dest 'bin'
        .on 'error', gutil.log

gulp.task 'test', ->
	gulp.src [ 'src/test/**/*.coffee' ]
        .pipe coffeelint()
        .pipe coffeelint.reporter()
		.pipe coffee()
		.pipe concat 'test-bundle.js'
		.pipe gulp.dest 'test'
        .on 'error', gutil.log

gulp.task 'default', [ 'lib', 'bin', 'test' ]

gulp.task 'watch', ['default'], ->
	gulp.watch 'src/lib/**/*.coffee', read: false, () -> gulp.start 'lib'
	gulp.watch 'src/test/**/*.coffee', read: false, () -> gulp.start 'test'
	gulp.watch 'src/bin/**/*.coffee', read: false, () -> gulp.start 'bin'
