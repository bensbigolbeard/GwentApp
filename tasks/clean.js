'use strict';

var coverageDirectory = 'coverage';

module.exports = function clear(grunt) {

	var es6files = grunt.file.expand({}, 'public/js/**/*.es6').map(function(file) {
		return file.replace('.es6', '.js');
	});

	return {
		tmp: 'tmp',
		babel: es6files
	};
};
