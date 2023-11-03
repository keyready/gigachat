import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { BuildOptions } from './config/types';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
            // filename: 'index.html',
        }),

        new webpack.ProgressPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:6].css',
            chunkFilename: 'css/[name]-[contenthash:6].css',
        }),

        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),

        new Dotenv({
            path: paths.dotenv,
        }),

        // new CopyPlugin({}),

        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),

        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];
}
