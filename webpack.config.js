var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");



var glob = require('glob');

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        console.log(2, pathname, entry);
        entries[pathname] = './' + entry;
    }
    return entries;
}
var htmls = getEntry('./**/*.html', '');
console.log();
var entries = {};
var HtmlPlugin = [];
for (var key in htmls) {
    entries[key] = htmls[key].replace('.html', '.js')
    HtmlPlugin.push(new HtmlWebpackPlugin({
      filename: (key == 'index\\index' ? 'index.html' : key + '.html'),
      template: htmls[key],
      inject: true,
      chunks: [key]
    }))
}

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry:{
        'index': 'js/index.js',
        'work': 'js/work.js'
    },

        // 'xm': 'xm/js/base.js',
        // 'tm': 'tm/js/base.js',
        // 'sn': 'sn/js/sn.js'
        //path.resolve(__dirname, 'js/index.js'),
        //path.resolve(__dirname, 'js/work.js'),

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
            inject: true,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'work.html',
            template: path.resolve(__dirname, 'work.html'),
            inject: true,
            chunks: ['work']
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'tm/index.html',
        //     template: path.resolve(__dirname, 'tm/index.html'),
        //     inject: true,
        //     chunks: ['tm']
        // }),
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin()
    ]
}
