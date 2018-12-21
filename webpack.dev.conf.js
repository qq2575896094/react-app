/**
 * 功能：开发环境webpack配置
 * 作者：yt
 * 日期：2018-12-21
 */

const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development', //设置环境变量, 不用在起服务的时候设置env='development'
    entry: path.resolve(APP_PATH, 'index.js'),
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: 'bundle.js'
    },
    //其它解决方案配置
    resolve: {
        // root: ROOT_PATH, //绝对路径 查找module的话从这里开始查找
        extensions: ['.js', '.json', '.css', '.less'],//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        alias: {//模块别名定义，方便后续直接引用别名，无须多写长长的地址
            '@': APP_PATH,
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!postcss-loader!less-loader",
                include: APP_PATH
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                // loader: 'style-loader!css-loader!postcss-loader'
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                include: APP_PATH
            },
            {
                test: /\.(png|jpe?g|gif|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
            }
        ]
    },
    plugins: [
        //实现打包文件插入到index.html文档中
        new HtmlWebpackPlugin({
            title: "REACT APP",
            template: path.join(APP_PATH, 'index.html'),
        }),

        //实现热加载
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === "dev") || "false"))
        }),

        //打开浏览器 地址:http://localhost:8080
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:8080'
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            '/api': {
                target: 'https://test.hulubank.com.cn/',
                secure: false
            }
        }
    }
}
