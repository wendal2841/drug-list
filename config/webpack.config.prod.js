'use strict';

const fs = require('fs');
const isWsl = require('is-wsl');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const styleLoader = require('./styleLoaders');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const appPackageJson = require(paths.appPackageJson);

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

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
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        bail: isEnvProduction,
        devtool: isEnvProduction ? shouldUseSourceMap ? 'source-map' : false : isEnvDevelopment && 'cheap-module-source-map',
        entry: [
            isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
        ].filter(Boolean),
        output: {
            path: isEnvProduction ? paths.appBuild : undefined,
            pathinfo: isEnvDevelopment,
            filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : isEnvDevelopment && 'static/js/bundle.js',
            chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : isEnvDevelopment && 'static/js/[name].chunk.js',
            publicPath: publicPath,
            devtoolModuleFilenameTemplate: isEnvProduction
                ? info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
                : isEnvDevelopment && (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
            jsonpFunction: `webpackJsonp${appPackageJson.name}`,
        },
        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    parallel: !isWsl,
                    cache: true,
                    sourceMap: shouldUseSourceMap,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: shouldUseSourceMap
                            ? {
                                inline: false,
                                annotation: true,
                            }
                            : false,
                    },
                }),
            ],
            splitChunks: {
                chunks: 'all',
                name: false,
            },
            runtimeChunk: true,
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
                PnpWebpackPlugin,
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        resolveLoader: {
            plugins: [
                PnpWebpackPlugin.moduleLoader(module),
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
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),
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
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: paths.appHtml,
                    },
                    isEnvProduction
                        ? {
                            minify: {
                                removeComments: true,
                                collapseWhitespace: true,
                                removeRedundantAttributes: true,
                                useShortDoctype: true,
                                removeEmptyAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                keepClosingSlash: true,
                                minifyJS: true,
                                minifyCSS: true,
                                minifyURLs: true,
                            },
                        }
                        : undefined
                )
            ),
            isEnvProduction && shouldInlineRuntimeChunk && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new ModuleNotFoundPlugin(paths.appPath),
            new webpack.DefinePlugin(env.stringified),
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            isEnvProduction && new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: publicPath,
                generate: (seed, files) => {
                    const manifestFiles = files.reduce(function (manifest, file) {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);

                    return {
                        files: manifestFiles,
                    };
                },
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            isEnvProduction && new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /asset-manifest\.json$/],
                importWorkboxFrom: 'cdn',
                navigateFallback: publicUrl + '/index.html',
                navigateFallbackBlacklist: [
                    new RegExp('^/_'),
                    new RegExp('/[^/?]+\\.[^/]+$'),
                ],
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
