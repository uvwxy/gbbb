module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ["build/*"]
        },
        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: ['src/js/app.js'], // add more stuff here
                dest: 'build/js/app.js'
            }
        },
        copy: {
            bsfonts: {
                expand: true,
                cwd: './',
                src: 'bower_components/bootstrap/dist/fonts/*',
                dest: 'build/fonts/',
                flatten: true
            },
            fontawesome: {
                expand: true,
                cwd: './',
                src: 'bower_components/fontawesome/fonts/*',
                dest: 'build/fonts/',
                flatten: true
            },
            html: {
                expand: true,
                cwd: './src',
                src: '**/*.html',
                dest: 'build/',
                flatten: false
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            libs: {
                src: 'build/js/libs.js',
                dest: 'build/js/libs.min.js'
            },
            app: {
                src: 'build/js/app.js',
                dest: 'build/js/app.min.js'
            }
        },
        less: {
            prod: {
                options: {
                    cleancss: true
                },
                files: {
                    "build/css/app.css": "src/less/app.less"
                }
            },
            dev: {
                options: {
                    cleancss: false
                },
                files: {
                    "build/css/app.css": "src/less/app.less"
                }
            }
        },
        bower_concat: {
            all: {
                dest: 'build/js/libs.js', // css is built via less task
                exclude: [
                    'bootswatch', // has no js
                    'fontawesome', // has no js
                    'less'
                ],
                dependencies: {
                    'bootstrap': 'jquery',
                    'angular': 'jquery',
                    'angular-route': 'angular',
                    'angular-ui': ['angular','bootstrap'],
                    'angular-ui-bootstrap':['angular-ui']
                },
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    'angular-ui': ['build/angular-ui.js', 'build/angular-ui-ieshiv.js']
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-concat');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat', 'bower_concat', 'less:dev', 'copy']);
    grunt.registerTask('prod', ['clean', 'concat', 'bower_concat', 'uglify', 'less:prod', 'copy']);

};