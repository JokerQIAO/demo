const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

var path = require('path');
var config = {

	entry: {
		main: './main'
	},
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'main.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
				loader:MiniCssExtractPlugin.loader,
				options:{
					publicPath:'/dist/'
				}
			},"css-loader"]
		}]
	},
	plugins:[

		new MiniCssExtractPlugin("main.css")
	]
};
module.exports = config;