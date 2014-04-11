'use strict';

module.exports = function (grunt) {

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: [
                    'public/dist/*'
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */' + '\n'
            },
            css: {
                src: [
                    'public/css/*.css'
                ],
                dest: 'public/dist/style.css'
            }
        },
        express: {
            web: {
                options: {
                    script: './app.js',
                }
            },
        },
        watch: {
            css: {
                files: ['public/css/*.css'],
                tasks: [
                    'clean',
                    'concat'
                ]
            },
            web: {
                files: [
                    'routes/*.js',
                    'models/*.js',
                    '*.js',
                    'views/*.ejs',
                    'public/dist/*'
                ],
                tasks: [
                    'express:web'
                ],
                options: {
                    spawn: false, //Without this option specified express won't be reloaded
                    atBegin: true,
                }
            }
        },
        parallel: {
            web: {
                options: {
                    stream: true
                },
                tasks: [{
                    grunt: true,
                    args: ['watch:css']
                }, {
                    grunt: true,
                    args: ['watch:web']
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('web', 'launch webserver and watch tasks', [
        // 'start',
        'parallel:web',
        // 'open:server',
    ]);

    // grunt.registerTask('default', ['connect', 'watch']);
    // grunt.registerTask('default', ['watch']);
    grunt.registerTask('default', ['web']);
};