"use strict";

var pkg = require( "./package.json" ),
	gulp = require( "gulp" ),
	eslint = require( "gulp-eslint" ),
	rename = require( "gulp-rename" ),
	uglify = require( "gulp-uglify" ),
	concat = require( "gulp-concat" ),
	header = require( "gulp-banner" ),

	banner = [ "/*!",
		" * <%= pkg.name %> - <%= pkg.description %>",
		" * @version v<%= pkg.version %>",
		" * @link <%= pkg.homepage %>",
		" * @copyright (c) 2015 - <%= new Date().getFullYear() %> <%= pkg.author.name %>",
		" * @license <%= pkg.license %>",
		" */",
		"" ].join( "\n" );

// lint
gulp.task( "lint", function() {
	return gulp.src( "src/" + pkg.name + ".js" )
	.pipe( eslint() )
	.pipe( eslint.format() )
	.pipe( eslint.failAfterError() );
} );

// build
gulp.task( "concat", [ "lint" ], function() {
	return gulp.src( "src/" + pkg.name + ".js" )
	.pipe( concat( "jquery." + pkg.name + ".js" ) )
	.pipe( gulp.dest( "dist/" ) );
} );

gulp.task( "banner", [ "concat" ], function() {
	return gulp.src( "dist/jquery." + pkg.name + ".js" )
		.pipe( header( banner, { pkg: pkg } ) )
		.pipe( gulp.dest( "dist/" ) );
} );

gulp.task( "uglify", [ "banner" ], function() {
	return gulp.src( "dist/jquery." + pkg.name + ".js" )
	.pipe( rename( "jquery." + pkg.name + ".min.js" ) )
	.pipe( uglify( {
		preserveComments: "license"
	} ) )
	.pipe( gulp.dest( "dist/" ) );
} );

gulp.task( "build", [ "uglify" ] );

gulp.task( "watch", function() {
	gulp.watch( "src/" + pkg.name + ".js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );
