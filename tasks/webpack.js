'use strict';

var config = require('../webpack.config');
var webpack = require('webpack');

module.exports = function requirejs(grunt) {

	grunt.loadNpmTasks('grunt-webpack');

	// remove source maps for production mode
	config.devtool = 'source-map';

	// production mode gets uglified JS
	//config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

	return {
		dist: config
	};
};
