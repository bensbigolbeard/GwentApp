'use strict';

var serverJS = [
	'index.js',
	'Gruntfile.js',
	'tasks/**/*.js'
];

var browserJS = [
	'public/js/*.js'
];

var ES6JS = [
	'public/js/**/*.es6'
].concat(serverJS.map(function(file) {
	return file.replace('js', 'es6');
}));

module.exports = {
	options: {
		config: '.eslintrc'
	},
	server: serverJS,
	browser: {
		options: {
			config: 'public/js/.eslintrc'
		},
		src: browserJS
	},
	es6: {
		options: {
			config: '.eslintes6rc'
		},
		src: ES6JS
	}
};
