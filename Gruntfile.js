module.exports = function(grunt) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),

		banner: "/*! <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
				"** Copyright (c) 2015 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n" +
				"** Dual licensed under MIT and GPL-2.0\n*/",

		jshint: {
			options: {
				jshintrc: true
			},
			gruntfile: {
				src: "Gruntfile.js"
			},
			src: {
				src: [ "src/**/*.js" ]
			}
		},

		concat: {
			options: {
				banners: "<%= banner %>\n",
				stripBanners: true
			},
			dist: [ "src/simpler-sidebar.js" ],
			dest: "dist/jquery.<%= pkg.name %>.js"
		},

		uglify: {
			options: {
				banner: "<%= banner %>\n"
			},
			dist: {
				src: "<%= concat.dist.dest %>",
				dest: "dist/jquery.<%= pkg.name %>.min.js"
			}
		},

		watch: {
			file: [ "src/simpler-sidebar.js" ],
			tasks: [ "jshint", "concat", "uglify" ]
		}
	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	grunt.registerTask( "default", [ "jshint", "concat", "uglify" ] );
};
