/**
	项目配置，项目入口，编译输出出口
	package.json是包管理设置
	在启动了webpack-dev-server后，编译后的文件并没有输出到webpack.config.js中配置的
	output输出目标文件夹中
**/

const VueLoaderPlugin = require('vue-loader/lib/plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const proxy = require('http-proxy-middleware');

var config = {
	devServer:{
		host:'localhost',
		port:7777,
		proxy:{
			'/api':{//当前项目请求的key
				target:'http://123.163.31.228:8090/',//代理服务器路径
				changeOrigin:true,
				pathRewrite:{
					'^/api':'/'
				}
			}
		}
	},
	entry:{
		main:'./main.js'
	},
	output:{
		path:path.join(__dirname,'./dist'),
		publicPath:'/dist/',
		filename:'main.js'
	},
	module:{
		rules:[{
			test:/\.vue$/,
			loader:'vue-loader',
			options:{
				loader:{
					css:ExtractTextPlugin.extract({
						use:'css-loader',
						fallback:'vue-style-loader'
					})
				}
			}
		},{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/node_modules/
		},{
			test:/\.css$/,
			use:ExtractTextPlugin.extract({
				use:'css-loader',
				fallback:'style-loader'
			})
		},{
			test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
			loader:'url-loader?limit=1024'
		}]
	},
	plugins:[
		//重命名提取后的css文件，生产编译后不需重命名
		new ExtractTextPlugin("main.css"),
		//较高vue.load需要，生产环境也需要设置
		new VueLoaderPlugin()
	]
};

module.exports = config;