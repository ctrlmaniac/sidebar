/*eslint max-len: ["error", { "ignoreStrings": true }]*/
module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  // Config and options
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    banner:
      "/*! <%= pkg.name %> - <%= pkg.description %>\n" +
      " * @version <%= pkg.version %>\n" +
      " * @link <%= pkg.homepage %>\n" +
      " * @copyright 2015 - <%= grunt.template.today('yyyy') %> " +
      "<%= pkg.author %>\n" +
      " * @license <%= pkg.license %>\n" +
      " */",

    eslint: {
      options: {
        config: ".eslitrc.json",
        reset: true,
      },
      target: ["src/*.js"],
    },

    concat: {
      options: {
        stripBanners: true,
        banner: "<%= banner %>\n",
      },
      dist: {
        src: ["src/<%= pkg.name %>.js"],
        dest: "dist/jquery.<%= pkg.name %>.js",
      },
      vendors: {
        src: [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/jquery-ui-dist/jquery-ui.min.js",
        ],
        dest: "demo/assets/js/vendors.js",
      },
    },

    uglify: {
      dist: {
        src: ["<%= concat.dist.dest %>"],
        dest: "dist/jquery.<%= pkg.name %>.min.js",
      },
      options: {
        banner: "<%= banner %>",
      },
    },

    watch: {
      files: ["src/<%= pkg.name %>.js"],
      tasks: ["build"],
    },
  });

  // registered tasks
  grunt.registerTask("lint", ["eslint"]);
  grunt.registerTask("build", ["lint", "concat", "uglify"]);
  grunt.registerTask("default", ["build"]);
};
