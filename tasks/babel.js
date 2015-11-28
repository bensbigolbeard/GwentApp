'use strict';

module.exports = function(grunt) {
	return {
		dist: {
			files: [{
				expand: true,
				cwd: 'public/js',
				src: ['**/*.es6'],
				dest: 'public/js/',
				ext: '.js'
			}]
		}
	};
};
