'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {

	context: path.resolve('public/js'),

	// entry points need to be set in public/js/routes/helper.js
	entry: {
		'app': 'app.es6'
	},

	devtool: 'eval-source-map', // bigger file sizes, but fast enough

	output: {
		path: __dirname,
		filename: "bundle.js"
	},

	contentBase: 'public/',

	module: {
		loaders: [
			{ test: /\.es6/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['react', 'es2015', 'stage-2']}}
		]
	},
	resolve: {
		modulesDirectories: ['public/js', 'node_modules'],

		// you can now require('file') instead of require('file.es6')
		extensions: ['', '.js', '.jsx', '.json', '.coffee', '.es6']
	}
};
