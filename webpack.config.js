const path = require ('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
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
        new MiniCssExtractPlugin ({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '../css/[name].css',
            chunkFilename: '../css/[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../images/[name].[ext]',
                        },
                    },
                ],
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