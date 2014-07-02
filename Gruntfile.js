
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['macros/util.sjs',
                      'macros/class.sjs',
                      'macros/fat-arrow.sjs',
                      // destructure must come last, so that `var` in
                      // any case macros is not overriden (those have
                      // special syntax)
                      'macros/destructure.sjs'],
                dest: 'index.js'
            }
        },
        sweetjs: {
            options: {
                modules: ['./index.js']
            },
            tests: {
                src: 'tests/**/*.sjs'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sweet.js');
    grunt.registerTask('default', ['concat']);
};
