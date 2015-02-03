module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js', 'tests/**/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
            mask: '*.js'
        }
      },
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*', // will check all coverage folders and merge the coverage results
          check: {
            lines: 80,
            statements: 80,
            branches: 50,
            lines: 80
          }
        }
      }
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        eqnull: true,
        globals: {
          jQuery: true
        },
      },
      server: {
        src: [
          'app.js',
          'routes/*.js',
          'models/*.js',
          'resources/*.js',
          'tests/*.js'
        ],
        exclude: [
          'server/config.js'
        ],
        options: {
          node: true,
          browser: false, // browser environment
          globals: [
          ]
        }
      },
      client: {
        src: [
          'public/javascripts/*.js'
        ],
        options: {
          browser: true, // browser environment
          globals: [
            '$',
            '_',
            'Backbone',
          ]
        }
      }
    },
    shell: {
      deploy_on_heroku: {
        command: 'git push heroku master'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-shell');

  // A very basic default task.
  grunt.registerTask('custom', 'My custom grunt task.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

  // Default task(s).
  grunt.registerTask('test', ['mocha_istanbul:coverage', 'istanbul_check_coverage']);
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('deploy', ['default', 'shell:deploy_on_heroku']);

};
