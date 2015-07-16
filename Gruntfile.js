'use strict';

module.exports = function(grunt) {
  //simple testing
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  //webpack files
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['*.js', './models/**/*.js', './routes/**/*.js', './test/**/*.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      dev: {
        src: ['<%= jshint.dev.src %>']
      }
    },

    simplemocha: {
      dev: {
        src: ['./test/**/*.js']
      }
    },

    /*WEBPACK config starts here:

      [webpack, copy, clean]

    */
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

  grunt.registerTask('test', ['jshint:dev', 'jscs:dev', 'simplemocha:dev']);
  grunt.registerTask('build', ['webpack:client', 'copy:html']);
};
