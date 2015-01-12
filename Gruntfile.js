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
    jshint: {
      options: {
        curly: true,
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // A very basic default task.
  grunt.registerTask('custom', 'My custom grunt task.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
