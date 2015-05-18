module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    banner: '/* <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> and licensed under <%= pkg.license %> (https://github.com/dcdeiv/<%= pkg.name %>/blob/master/LICENSE)\n' +
            ' */\n',
    
    concat: {
        dist: {
            src: ['src/development.js', 'src/options.js'],
            dest: '<%= pkg.name %>.js',
            nonull: true,
        },
        options: {
            banner: '<%= banner %>' +
                    '(function( $ ) {\n',
            footer: '})(jQuery);',
            separator: '\n',
        }
    },
    
    jshint: {
        beforeconcat: ['src/development.js', 'src/options.js'],
        afterconcat: ['<%= pkg.name %>.js'],
        options: {
            globals: {
                jQuery: true
            }
        }
    },
    
    jsbeautifier: {
        files: ['<%= pkg.name %>.js', 'src/**/*.js', '!src/old.js'],
        options: {
            mode: 'VERITY_AND_WRITE',
            js: {
                bracesStyle: 'expand',
                indentChar: ' ',
                indentSize: 4,
                indentWithTabs: false,
                jslintHappy: false,
                keepFunctionIndentation: true,
                endWithNewLine: true,
                wrapLineLength: 80
            }
        }
    },
    
    uglify: {
      options: {
        banner: '<%= banner %>' 
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    
    watch: {
        files: ['<%= jshint.files %>'],
        task: ['jshint']
    }
  });
  
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat', 'jsbeautifier', 'uglify']);
  

};
