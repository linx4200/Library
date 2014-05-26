'use strict';

module.exports = function (grunt) {

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            seajs: {
                src: [
                    'public/.build'
                ]
            }
        },
        transport : {
            options: {
                path: ['public/js'],
                // format: 'app/dist/',
                debug : false
            },
            app: {
                files: [
                    {
                        expand : true,
                        cwd: 'public/js/',
                        src: [
                            '**/*.js',
                            '!lib/*.js',
                            '!seajs/*.js',
                        ],
                        dest: 'public/.build'
                    }
                ]
            }
            // app: {
            //     files: {
            //         'public/dist/.build': ['public/js/components/*.js', 'public/js/page/*.js']
            //     }
            // }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */' + '\n'
            },
            css: {
                src: [
                    'public/css/reset.css',
                    'public/css/bootstrap.css',
                    'public/css/flat-ui.css',
                    'public/css/style.css'
                ],
                dest: 'public/dist/css/style.css'
            },
            js: {
                src: [
                    'public/js/seajs/*.js',
                    'public/.build/**/*.js'
                    
                ],
                dest: 'public/dist/js/app.js'
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
                    'concat:css'
                ]
            },
            js: {
                files: ['public/js/**/*'],
                tasks: [
                    'seajs'
                ]
            },
            web: {
                files: [
                    'routes/*.js',
                    'models/*.js',
                    '*.js',
                    'views/*.ejs',
                    'public/dist/*',
                    'utils/*.js'
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
                    args: ['watch:js']
                }, {
                    grunt: true,
                    args: ['watch:web']
                }]
            }
        },
        uglify: {
            app: {
                files: {
                    'public/dist/js/app.min.js': ['public/dist/js/app.js']
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'public/dist/css/style.min.css': ['public/dist/css/style.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('web', 'launch webserver and watch tasks', [
        // 'start',
        'parallel:web',
        // 'open:server',
    ]);

    // grunt.registerTask('default', ['connect', 'watch']);
    // grunt.registerTask('default', ['watch']);
    grunt.registerTask('default', ['web']);
    grunt.registerTask('seajs', ['clean:seajs', 'transport', 'concat:js', 'clean:seajs']);
    grunt.registerTask('build', ['seajs', 'uglify', 'cssmin', 'web']);

};