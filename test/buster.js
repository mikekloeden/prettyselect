/*global module:false*/
var config = module.exports;

config['prettyselects tests'] = {
    rootPath: '../',
    environment: 'browser',
    libs: [
        'lib/**/*.js'
    ],
    sources: [
        'src/**/*.js'
    ],
    tests: [
        'test/**/*-test.js'
    ]
};