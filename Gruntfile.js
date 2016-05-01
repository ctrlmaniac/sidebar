module.exports = function( grunt ) {

	grunt.initConfig( {

		pkg: grunt.file.readJSON( "package.json" ),

		meta: {
			banner: "/*! <%= pkg.name %> v<%= pkg.version %>" +
				" (<%= pkg.homepage %>)\n" +
				"** Copyright (c) 2015 - <%= grunt.template.today( 'yyyy' ) %> " +
				"<%= pkg.author.name %>\n" +
				"** Dual licensed under MIT and GPL-2.0\n*/"
		},

		// Concat definitions
		concat: {
			options: {
				stripBanners: true,
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [ "src/simpler-sidebar.js" ],
				dest: "dist/jquery.<%= pkg.name %>.js"
			}
		},

		// Link definitions
		jshint: {
			files: [
				"src/simpler-sidebar.js",
				"test/**/*"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: [
					"<%= concat.dist.dest %>"
				],
				dest: "dist/jquery.<%= pkg.name %>.min.js"
			},
			options: {
				banner: "<%= meta.banner %>\n"
			}
		}
	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	grunt.registerTask( "lint", [ "jshint", "jscs" ] );
	grunt.registerTask( "build", [ "lint", "concat", "uglify" ] );
	grunt.registerTask( "default", [ "lint", "build" ] );
};
