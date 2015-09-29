'use strict';

module.exports = function(grunt) {
  var path = require('path');
  //simple testing
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  //webpack files
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  //angular, karma test files
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jasmine: {
      src: ['test/karma_test/*test.js']
    },

    jshint: {
      dev: {
        src: ['*.js', './models/**/*.js', './routes/**/*.js', './app/**/*.js', './lib/**/*.js', './test/**/*.js']
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
        src: ['./test/freezr_api_test.js']
      }
    },

    /*WEBPACK config starts here:

      [webpack, copy, clean]

    */
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: path.join(__dirname, 'build/'),
          filename: 'bundle.js'
        }
      },
      karmaTest: {
        entry: __dirname + '/test/karma_test/test_client.js',
        output: {
          path: 'test/karma_test/',
          file: 'bundle.js'
        }
      }
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
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
      },
      css: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.css',
        dest: 'build/',
        filter: 'isFile'
      },
      img: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: ['**/*.jpg', '**/*.png'],
        dest: 'build/',
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
  grunt.registerTask('karmatest', ['webpack:karmaTest', 'karma:test']);
  grunt.registerTask('dev:tests', ['test', 'karmatest']);
  grunt.registerTask('build', ['webpack:client', 'copy:html', 'copy:css', 'copy:img']);
};
