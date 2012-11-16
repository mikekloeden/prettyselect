/*global module:false*/
module.exports = function(grunt) {    
    grunt.initConfig({
        pkg: '<json:prettyselect.jquery.json>',
        meta: {
            banner: '/*!'  + "\n" +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
                '<%= pkg.licenses ? "; Licensed " + _.pluck(pkg.licenses, "type").join(", ") : "" %>' +
                "\n" + ' */'
        },
        concat: {
            js: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
                dest: 'dist/jquery.<%= pkg.name %>.js'
            },
            css: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.css>'],
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        min: {
            js: {
                src: ['<banner:meta.banner>', '<config:concat.js.dest>'],
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            }
        },
        lint: {
            files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint buster'
        },
        uglify: {},
        buster: {}
    });

    grunt.registerTask('default', 'lint buster concat min');
    
    grunt.loadNpmTasks('grunt-buster'); 
};