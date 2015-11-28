'use strict';

module.exports = function (grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-config')(grunt, {
		configPath: require('path').resolve('tasks')
	});

	// Build
	grunt.registerTask('build', ['clean', 'webpack:dist']);
};
