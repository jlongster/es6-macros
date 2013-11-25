
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: [ 'macros/destructure.sjs', 'macros/class.sjs' ],
                dest: 'index.sjs'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};
