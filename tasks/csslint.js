'use strict';

module.exports = function csslint(grunt) {
	return {
		options: {
			csslintrc: '.csslintrc'
		},
		strict: {
			src: [
				'.build/css/summary.css'
			]
		}
	};
};
