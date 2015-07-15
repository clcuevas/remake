'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          filename: 'bundle.js'
        }
      }
    },

    copy: {
      html: {
        //current working directory
        cwd: 'app/',
        //this allows sub-directory copy for HTML files
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        //only copy files
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        //clean everything in the build directory
        src: 'build/'
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
};
