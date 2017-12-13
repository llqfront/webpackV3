// webpack.config.js
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin')
const devServer = {
    // contentBase: './bundle',
    contentBase: './',
    port: 8010,
    hot: false,
    progress: false
}
const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'index',
        filename: "js/[name].js"
    }),
    new ExtractTextPlugin("css/index.css", {
        allChunks: false
    }),
    // new CleanWebpackPlugin(["js", "css", "img"], {
    //     root: __dirname + "/dist/",
    //     verbose: true,
    //     dry: false
    // }),
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("produce")
        }
    }),
    new webpack.ProvidePlugin({
        Promise: "exports-loader?global.Promise!es6-promise",
        fetch: "exports-loader?self.fetch!whatwg-fetch"
    }),
    new ExtractTextPlugin({
        filename: (getPath) => {
            return getPath('css/[name].css').replace('\\js', '').replace('\\', '');
        },
        allChunks: true
    })
    // new HtmlWebpackPlugin({
    //     template: './index.html',
    // })
];
const config = {
    entry: {
        index:[
            'webpack/hot/dev-server',
            './dev/entry'
        ]
        // demo1:[
        //     'webpack/hot/dev-server',
        //     './dev/js/demo1'
        // ],
        // demo2:[
        //     'webpack/hot/dev-server',
        //     './dev/js/demo2'
        // ]
    },
    output: {
        path: path.join(__dirname, 'bundle/'),
        // filename: 'js/[name][hash].js',
        filename: 'js/[name].js',
        publicPath:"/bundle/"
    },
    devtool: 'inline-source-map',
    devServer: devServer,
    plugins: plugins,
    resolve: {
        enforceExtension: false,
        extensions: [
            ".js", ".json", ".jsx"
        ],
        modules: ["node_modules"]
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "es2015"
                    ],
                    plugins: ["transform-runtime", "syntax-dynamic-import"]
                }
            },
            exclude: /node_modules/
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: "img/"
                    }
                }
            ]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true,
                    }
                }, {
                    loader: "sass-loader"
                }]
            })
        }]

    }
}
module.exports = config;
