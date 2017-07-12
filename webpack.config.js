var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: path.resolve(__dirname, 'index.html'),
    // 输出配置
    output: {
        path: path.join(__dirname, "build/"),
        filename: "[name].js",
        publicPath: "/build/",
        chunkFilename: "[id].chunk.js",
        pathinfo: true,
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                }
            },
            //图片打包
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            //css单独打包
            {
                test: /\.css$/,
                loader: 'style!css'
                // ExtractTextPlugin.extract("style-loader","css-loader")
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.html','.png', '.jpg', '.gif', '.eot']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            inject: true
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin()
    ]
}
