#!/bin/env node

GLOBAL.os		= require('os');
GLOBAL.fs		= require('fs');
GLOBAL.url		= require('url');
GLOBAL.sys		= require('sys');
GLOBAL.util		= require('util');
GLOBAL.path		= require('path');
GLOBAL.async	= require('async');
GLOBAL._		= require('underscore');
GLOBAL._.str	= require('underscore.string');
GLOBAL.express	= require('express');

GLOBAL._.mixin(GLOBAL._.str.exports());

GLOBAL.packages = require('../package.json');

async.series({
	variables : function (callback) {
		console.log('Check Variables');
		// OPENSHIFT
		process.env.OPENSHIFT_APP_NAME = process.env.OPENSHIFT_APP_NAME || 'BLUE';
		process.env.OPENSHIFT_APP_UUID = process.env.OPENSHIFT_APP_UUID || 'BLAS';
		process.env.OPENSHIFT_DATA_DIR = process.env.OPENSHIFT_DATA_DIR || '';
		process.env.OPENSHIFT_MONGODB_DB_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1';
		process.env.OPENSHIFT_MONGODB_DB_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
		process.env.OPENSHIFT_NODEJS_IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
		process.env.OPENSHIFT_NODEJS_PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;

		callback();
	},

	// Your Apps Start!

	server : function (callback) {
		console.log('Check Server');
		var server;
		try{
			server = require('../routes');
			callback(null, server);
		}catch(e){
			callback(e, server);
		}
	}
}, function (err, results) {
	if(err || _.isEmpty(results.server)) 
		throw ( err || new Error('The server no exist') ).toString();

	// ONLY WHIT DONT USE GHOST
	results.server(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
		console.log('Run!');
	});
});