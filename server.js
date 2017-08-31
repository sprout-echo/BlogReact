var config = require('./webpack.config.js');
var webpack = require('webpack');
var openurl = require('openurl');
var webpackDevServer = require('webpack-dev-server');

config.entry.main.unshift("webpack-dev-server/client?http://localhost:8800/");
var compiler = webpack(config);
var server = new webpackDevServer(compiler,{inline:true});
server.listen(8800);
openurl.open("http://127.0.0.1:8800");
