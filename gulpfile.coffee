'use strict'

gulp		= require 'gulp'
coffee		= require 'gulp-coffee'
uglify		= require 'gulp-uglify'
concat		= require 'gulp-concat'
source		= require 'vinyl-source-stream'
path		= require 'path'

gulp.task 'lib', ->
	gulp.src [ 'src/lib/**/*.coffee' ]
		.pipe coffee()
		.pipe concat 'pants.js'
		.pipe gulp.dest 'dist'

gulp.task 'bin', ->
	gulp.src [ 'src/bin/**/*.coffee' ]
		.pipe coffee()
		.pipe concat 'pants'
		.pipe gulp.dest 'bin'

gulp.task 'test', ->
	gulp.src [ 'src/test/**/*.coffee' ]
		.pipe coffee()
		.pipe concat 'test-bundle.js'
		.pipe gulp.dest 'test'

gulp.task 'default', [ 'src', 'test' ]

gulp.task 'watch', ->
	gulp.watch 'src/lib/**/*.coffee', [ 'src' ]
	gulp.watch 'src/test/**/*.coffee', [ 'test' ]