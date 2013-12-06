
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['macros/util.sjs',
                      'macros/destructure.sjs',
                      'macros/class.sjs' ],
                dest: 'index.sjs'
            }
        },
        sweet_js: {
            options: {
                modules: ['./index']
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
