const path = require ('path');
const webpack = require ('webpack');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CopyPlugin = require ('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/main.js',
        admin: './src/admin.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve (__dirname, 'js'),
    },
    plugins: [
        new webpack.ProvidePlugin ({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new MiniCssExtractPlugin ({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '../css/[name].css',
            chunkFilename: '../css/[id].css',
        }),
        new CopyPlugin ({
            patterns: [
                {from: './node_modules/trumbowyg/dist/ui/icons.svg', to: './ui/icons.svg'},
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './css/',
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({ parallel: true })
        ],
    },
};