module.exports = function(grunt) {

    var MINIMIZE = false;

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
            dist: "dist/",
            buildfiles: ["dist/modules.js","dist/templates.js"]
        },

        jst: {
            compile: {
                files: {
                    "dist/templates.js": [
                        "app/templates/**/*.ejs"
                    ]
                }
            }
        },
        
        less: {
            compile: {
                options: {
                    paths: ["styles"],
                    yuicompress: MINIMIZE
                },
                files: {
                    "dist/styles.css": "styles/styles.less"
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    almond: true,
                    mainConfigFile: "app/config.js",

                    optimize: MINIMIZE ? 'uglify' : 'none',
                    out: "dist/modules.js",
                    name: "app",
                    insertRequire: ['app']
                }
            }
            
        },

        concat: {
            dist: {
                src: [
                    "dist/templates.js",
                    "dist/modules.js"
                ],
                dest: "dist/scripts.js",
                separator: ";"
            }
        },


        targethtml: {
            compile: {
                src: "index.html",
                dest: "dist/index.html"
            }
        },
        
        copy: {
            compile: {
                files: {
                    "dist/": "img/**"
                }
            }
        },
        
        connect: {
            dev: {
                port: 8000,
                base: './'
            },
            debug: {
                port: 8000,
                base: './dist/'
            }        
            
        }

    });
    
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-connect');
    grunt.loadNpmTasks('grunt-targethtml');
    
    grunt.registerTask("compile", ['clean:dist', 'jst', 'less', 'requirejs', 'concat', 'targethtml', 'copy', 'clean:buildfiles']);

    grunt.registerTask("devserv", "connect:dev");
    grunt.registerTask("server", ['compile', 'connect:debug']);

};
