'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const styleLoader = require('./styleLoaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

const useTypeScript = fs.existsSync(paths.appTsConfig);

const regex = {
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    less: /\.less$/,
    lessModule: /\.module\.less$/,
    tsAndTsx: /\.(ts|tsx)$/,
    file: /\.(png|svg|jpg|gif)$/,
    urlFile: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
    eslintLoader: /\.(js|mjs|jsx|ts|tsx)$/,
};

module.exports = function (webpackEnv) {
    const getStyleLoaders = styleLoader(webpackEnv);
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';

    const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : isEnvDevelopment && '';
    const env = getClientEnvironment(publicUrl);

    return {
        mode: 'development',
        devtool: 'source-map',
        entry: [
            require.resolve('./polyfills'),
            require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
        ].filter(Boolean),
        output: {
            path: paths.appBuild,
            pathinfo: true,
            filename: 'static/js/bundle.js',
            chunkFilename: 'static/js/[name].chunk.js',
            publicPath: publicPath,
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        },
        resolve: {
            modules: ['node_modules', paths.appNodeModules].concat(
                modules.additionalModulePaths || []
            ),
            extensions: paths.moduleFileExtensions
                .map(ext => `.${ext}`)
                .filter(ext => useTypeScript || !ext.includes('ts')),
            alias: paths.appAlias,
            plugins: [
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: imageInlineSizeLimit,
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                        {
                            test: regex.tsAndTsx,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                presets: [['react-app', { flow: false, typescript: true }]],
                                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent:
                                                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                                },
                                            },
                                        },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: isEnvProduction,
                                compact: isEnvProduction,
                            },
                        },
                        {
                            test: regex.css,
                            exclude: regex.cssModule,
                            use: getStyleLoaders({
                                importLoaders: 1,
                            }),
                            sideEffects: true,
                        },
                        {
                            test: regex.cssModule,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            }),
                        },
                        {
                            test: regex.less,
                            exclude: regex.lessModule,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                },
                                'less-loader'
                            ),
                            sideEffects: true,
                        },
                        {
                            test: regex.lessModule,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                    modules: true,
                                    getLocalIdent: getCSSModuleLocalIdent,
                                },
                                'less-loader'
                            ),
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ModuleNotFoundPlugin(paths.appPath),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml,
            }),
            new webpack.DefinePlugin(env.stringified),
            new webpack.HotModuleReplacementPlugin(),
            new CaseSensitivePathsPlugin(),
            new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.EnvironmentPlugin({
                API_URL: 'http://localhost:8080',
                WS_URL: 'ws://ws.localhost:8080/wss?uuid=',
                DOMAIN: 'localhost',
            }),
            useTypeScript && new ForkTsCheckerWebpackPlugin({
                typescript: resolve.sync('typescript', {
                    basedir: paths.appNodeModules,
                }),
                async: isEnvDevelopment,
                useTypescriptIncrementalApi: true,
                checkSyntacticErrors: true,
                resolveModuleNameModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
                resolveTypeReferenceDirectiveModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
                tsconfig: paths.appTsConfig,
                reportFiles: [
                    '**',
                    '!**/__tests__/**',
                    '!**/?(*.)(spec|test).*',
                    '!**/src/setupProxy.*',
                    '!**/src/setupTests.*',
                ],
                watch: paths.appSrc,
                silent: true,
                formatter: isEnvProduction ? typescriptFormatter : undefined,
            }),
        ].filter(Boolean),
        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        performance: false,
    };
};
