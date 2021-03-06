/**
 *   #----------------------------------------------------------#
 *   # * @Company       : Beesightsoft Ltd.,Co.                 #
 *   # * @Project       : test                       #
 *   # * @File          :                           #
 *   # * @Developer     : taint.ict@gmail.com                   #
 *   # * @IDE           : PhpStorm                              #
 *   # * @Copyright     : 2011 - 2014                           #
 *   #----------------------------------------------------------#
 *
 *                                        CHANGE HISTORY
 *   ---------------------------------------------------------------------------------------------
 *   |   DATE         | DEVELOPER             | DESCRIPTION                                       |
 *   ---------------------------------------------------------------------------------------------
 *   | Jul-14-2014    | taint.ict@gmail.com   | First creation.                                   |
 *   --------------------------------------------------------------------------------------------
 *
 *
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/src/**/*.js'],
                dest: 'js/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['grunt.js', 'js/src/**/*.js', 'js/test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};