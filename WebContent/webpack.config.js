var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ueditorPath = path.resolve(__dirname, './_admin/ueditor1.6.1');
module.exports = {
    //entry: {
    //    page1: path.resolve(__dirname, './src/js/index.jsx'),
    //        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
    //    page2: path.resolve(__dirname, './src/js/hello.jsx')
    //},

	//entry: path.resolve(__dirname, './_admin/src/js/index.jsx'),
	//https://segmentfault.com/q/1010000002607794

    entry: {
		//main: path.resolve(__dirname, './_admin/src/js/index.jsx'),
		//login: path.resolve(__dirname, './_login/src/js/index.jsx'),
		"_admin/admin": './_admin/src/js/index.jsx',
		"_login/login": './_login/src/js/index.jsx',
        common: ['react','jquery','antd']
    },
	output: {
		path: path.resolve(__dirname, './_admin'),
        publicPath: "",
        hash: true,
		filename: 'js/[name].entry.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
                //exclude: [nodeModulesPath, ueditorPath]
                exclude: /node_modules/,
				//,query: {presets: ['es2015','react']}
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {presets: ['es2015','react']}
			},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.scss|sass/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                // 超过limit的图片会让 url-loader处理
                loader: 'url-loader?limit=10&name=img/[hash:8].[name].[ext]'
            }

		] 
	},
    plugins: [
        new ExtractTextPlugin("css/[name].css", {allChunks: true}),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            //favicon:'./src/img/favicon.ico', //favicon路径
            filename: './index.html',    //生成的html存放路径，相对于 path
            template:'./_admin/src/template/index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common',  'js/common.entry.js')
    ]



};


