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
  grunt.loadNpmTasks('grunt-shell');

  // A very basic default task.
  grunt.registerTask('custom', 'My custom grunt task.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'mochaTest']);

  grunt.registerTask('deploy', ['default', 'mochaTest', 'shell:deploy_on_heroku']);

};
